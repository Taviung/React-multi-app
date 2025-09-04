import {useParams, useNavigate, useBlocker} from "react-router-dom";
import {useEffect, useState, useMemo, useCallback} from "react";
import { reduxForm, Field, FieldArray } from "redux-form";
import styled from "styled-components";
import InputFieldRef from "./InputFieldRef.jsx";
import Button, { RedButton } from "./Button.jsx";
import { useActivity } from "./ActivityContext.jsx";

const EditWrapper = styled.div`
    background: ${({ theme }) => theme.background};
    color: ${({ theme }) => theme.text};
`;

const validate = (values) => {
    const errors = {};

    if (!values.taskTitle) {
        errors.taskTitle = "Required";
    } else if (values.taskTitle.length < 3) {
        errors.taskTitle = "At least 3 characters";
    } else if (values.taskTitle.length > 50) {
        errors.taskTitle = "At most 50 characters";
    }

    if (!values.end) {
        errors.end = "Required";
    }

    if (!values.email) {
        errors.email = "Required";
    } else if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(values.email)) {
        errors.email = "Invalid email address";
    }

    if (!values.backupEmail) {
        errors.backupEmail = "Required";
    } else if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(values.backupEmail)) {
        errors.backupEmail = "Invalid email address";
    }

    if (!values.username) {
        errors.username = "Required";
    } else if (values.username.length < 3) {
        errors.username = "At least 3 characters";
    }

    if (!values.country) {
        errors.country = "Required";
    }

    if (!values.hobbies || values.hobbies.length === 0) {
        errors.hobbies = { _error: "At least one hobby must be entered" };
    } else {
        const hobbiesErrors = [];
        values.hobbies.forEach((hobby, index) => {
            const hobbyErrors = {};
            if (!hobby || !hobby.name) {
                hobbyErrors.name = "Required";
                hobbiesErrors[index] = hobbyErrors;
            }
        });

        if (hobbiesErrors.length) {
            errors.hobbies = hobbiesErrors;
        }
    }

    return errors;
};

const mockCheckUsername = async username => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const takenUsernames = ["john", "tofu"];
            takenUsernames.includes(username) ? reject({ username: "Username is already taken" }) : resolve();
        }, 10);
    });
};

const renderField = ({ input, label, type, meta: { touched, error }, children }) => (
    <>
        <label>{label}</label>
        <div>
            {type === "select" ? (<select {...input}>{children}</select>) : (<InputFieldRef {...input} type={type} headerText={label} />)}
            {touched && error && <span style={{ color: "red" }}>{error}</span>}
        </div>
    </>
);

const renderHobbies = ({ fields, meta: { error } }) => (
    <>
        <div>
            <label>Hobbies</label>
            {fields.map((hobby, index) => (
                <section key={index}>
                    <Field name={`${hobby}.name`} type="text" component={renderField} label={`Hobby #${index + 1}`} />
                    <RedButton type="button" onClick={() => fields.pop()} text="Remove" />
                </section>
            ))}
            <Button type="button" onClick={() => fields.push({ name: "" })} text="Add Hobby" />
            {error && <span style={{ color: "red" }}>{error}</span>}
        </div>
    </>
);

let ReduxEditTaskForm = (props) => {
    const { handleSubmit, pristine, dirty, submitting, navigate, id, countries, valid } = props;

    const shouldBlock = useCallback(() => dirty === true, [dirty]);
    const blocker = useBlocker(shouldBlock);

    useEffect(() => {
        if (blocker.state === "blocked") {
            const confirm = window.confirm("You have unsaved changes. Do you want to continue?");
            if (confirm) {
                blocker.proceed();
            } else {
                blocker.reset();
            }
        }
    }, [blocker]);

    console.log("Valid", valid);
    return (
        <EditWrapper>
            <h3 className="themeFontColor">Edit Task</h3>
            <form onSubmit={handleSubmit}>
                <Field name="taskTitle" type="text" component={renderField} label="Task Name"  />
                <Field name="end" type="date" component={renderField} label="End Date"  />
                <Field name="email" type="text" component={renderField} label="Email"  />
                <Field name="backupEmail" type="text" component={renderField} label="Backup Email"  />
                <Field name="username" type="text" component={renderField} label="Username"  />
                <Field name="country" type="select" component={renderField} label="Country" >
                    <option value="">Select a country</option>
                    {countries.map(c => (<option key={c.value} value={c.value}>{c.label}</option>))}
                </Field>
                <FieldArray name="hobbies" component={renderHobbies} />
                <Button text="Save Changes" type="submit" disabled={pristine || submitting} />
                <RedButton text="Cancel" onClick={() => navigate(`/todos/${id}`)} />
            </form>
        </EditWrapper>
    );
};

ReduxEditTaskForm = reduxForm({
    form: "editTaskForm",
    enableReinitialize: true,
    asyncValidate: values => mockCheckUsername(values.username),
    asyncBlurFields: ["username"],
    validate,
})(ReduxEditTaskForm);

const EditTaskContainer = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { activity, setActivity } = useActivity();
    const [countries, setCountries] = useState([]);

    useEffect(() => {
        fetch("https://valid.layercode.workers.dev/list/countries?format=select&flags=true&value=code")
            .then(res => res.json())
            .then(data => setCountries(data.countries));
    }, []);

    console.log(countries);

    const initialValues = useMemo(() => {
        const found = activity.find(t => String(t.id) === String(id));
        if (!found) return {};

        const countryObj = countries.find(c => c.label === found.country);
        const countryCode = countryObj ? countryObj.value : "";

        return {
            taskTitle: found.task,
            end: found.endDate,
            email: found.email || "",
            backupEmail: found.backupEmail || "",
            username: found.username || "",
            country: countryCode,
            hobbies: found.hobbies && found.hobbies.length > 0 ? found.hobbies : [{ name: "" }],
        };
    }, [activity, id, countries]);

    const onSubmit = (formData) => {
        const countryObj = countries.find(c => c.value === formData.country);
        const countryLabelToSave = countryObj ? countryObj.label : formData.country;
        console.log("H", formData);
        const updated = activity.map(item =>
            String(item.id) === String(id)
                ? {
                    ...item,
                    task: formData.taskTitle,
                    endDate: formData.end,
                    email: formData.email,
                    backupEmail: formData.backupEmail,
                    username: formData.username,
                    country: countryLabelToSave,
                    hobbies: formData.hobbies?.filter(h => h && h.name) || [],
                }
                : item
        );
        setActivity(updated);
        navigate(`/todos/${id}`);
    };

    if (!initialValues.taskTitle) {
        return <div>Loading task...</div>;
    }

    return (
        <ReduxEditTaskForm
            initialValues={initialValues}
            onSubmit={onSubmit}
            navigate={navigate}
            id={id}
            countries={countries}
        />
    );
};

export default EditTaskContainer;