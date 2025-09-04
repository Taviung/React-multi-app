import {Controller, useFieldArray, useForm} from "react-hook-form";
import InputFieldRef from "./InputFieldRef.jsx";
import Button, { RedButton } from "./Button";
import { useActivity } from "./ActivityContext";
import { useBlocker, useNavigate } from "react-router-dom";
import { useCallback, useEffect, useState } from "react";
import Select from "react-select";
import styled from "styled-components";

const StyledSelect = styled(Select)`
    background: ${({ theme }) => theme.background};
    color: ${({ theme }) => theme.inputText};
    width: 20%;
`;

const StyledInput = styled.input`
    background-color: ${({ theme }) => theme.inputBackground};
    color: ${({ theme }) => theme.inputText};
    border: none;
    padding: 10px 14px;
    font-size: 1rem;
    border-radius: 50px;
    width: 50px;
    margin-bottom: 10px;
    margin-right: 10px;

    &::placeholder {
        color: ${({ theme }) => theme.inputPlaceholder};
    }
`;

const FormContainer = styled.form`
    display: flex;
    flex-direction: column;
`;

const FormGroup = styled.div`
    display: flex;
    flex-direction: column;
`;

const ErrorText = styled.p`
  color: red;
  font-size: 0.8rem;
  margin: 4px 0 8px 0;
`;

const AddForm = () => {

    const mockCheckUsername = async (username) => {
        return new Promise((resolve) => {
            setTimeout(() => {
                const takenUsernames = ['john', 'tofu'];
                if (takenUsernames.includes(username)) {
                    resolve(false);
                } else {
                    resolve(true);
                }
            }, 1000);
        });
    };

    const navigate = useNavigate();
    const [countries, setCountries] = useState([]);

    const {
        register,
        control,
        handleSubmit,
        reset,
        setValue,
        watch,
        formState: { isValidating, isDirty, errors, touchedFields, isSubmitted }
    } = useForm({
        mode: "onTouched",
        defaultValues: {
            taskTitle: '',
            end: '',
            country: '',
            email: '',
            backupEmail: '',
            username: '',
            hobbies: [{name: ''}],
        }
    });

    const { fields, append, remove } = useFieldArray({
        name: "hobbies",
        control,
    })

    const emailValue = watch('email');
    const backupEmailValue = watch('backupEmail');

    const shouldBlock = useCallback(() => isDirty === true, [isDirty]);
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

    useEffect(() => {
        fetch("https://valid.layercode.workers.dev/list/countries?format=select&flags=true&value=code")
            .then((response) => response.json())
            .then((dataCountry) => {
                setCountries(dataCountry.countries);
            });
    }, []);

    const { setActivity, activity } = useActivity();

    const addActivity = (formData) => {
        const { taskTitle, end, email, backupEmail, country, username, hobbies } = formData;

        const newActivity = {
            id: activity.reduce((max, item) => Math.max(max, item.id), 0) + 1,
            task: taskTitle,
            creationDate: new Date().toISOString().split('T')[0],
            endDate: end,
            country: country?.label || '',
            email: email,
            backupEmail: backupEmail,
            username: username,
            hobbies: hobbies,
        };

        setActivity([...activity, newActivity]);
    };

    const onSubmit = (data) => {
        addActivity(data);
        reset();
        navigate('/todos');
    };

    const handleClose = () => {
        reset();
        navigate('/todos');
    };

    const showError = (fieldName) =>
        errors[fieldName] && (touchedFields[fieldName] || isSubmitted);

    return (
        <>
            <FormContainer>
                <h3 className="themeFontColor text-center">Add a new activity</h3>
                <FormGroup>
                    <label>Task Name</label>
                    <InputFieldRef
                        headerText="Input Task Name"
                        type="text"
                        {...register('taskTitle', {
                            required: "Task title is required",
                            minLength: { value: 3, message: "At least 3 characters" },
                            maxLength: { value: 50, message: "At most 50 characters" },
                            pattern: { value: /^[A-Za-z\s]+$/, message: "Only alphabetic characters" }
                        })}
                    />
                    {showError('taskTitle') && (
                        <ErrorText>{errors.taskTitle.message}</ErrorText>
                    )}

                    <label>End Date</label>
                    <InputFieldRef
                        headerText="Input End Date"
                        type="date"
                        {...register('end', {
                            required: "End date is required"
                        })}
                    />
                    {showError('end') && (
                        <ErrorText>{errors.end.message}</ErrorText>
                    )}

                    <label>Email</label>
                    <InputFieldRef
                        headerText="Input Email"
                        type="text"
                        {...register('email', {
                            required: "Email is required",
                            pattern: {
                                value: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/,
                                message: "Invalid email address"
                            },
                            onBlur: () => {
                                if (!backupEmailValue) {
                                    setValue('backupEmail', emailValue, { shouldValidate: true });
                                }
                            }
                        })}
                    />
                    {showError('email') && (
                        <ErrorText>{errors.email.message}</ErrorText>
                    )}

                    <label>Backup Email</label>
                    <InputFieldRef
                        headerText="Input Backup Email"
                        type="text"
                        {...register('backupEmail', {
                            required: "Backup email is required",
                            pattern: {
                                value: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/,
                                message: "Invalid email address"
                            }
                        })}
                    />
                    {showError('backupEmail') && (
                        <ErrorText>{errors.backupEmail.message}</ErrorText>
                    )}

                    <label>Username</label>
                    <InputFieldRef
                        headerText="Input Username"
                        type="text"
                        {...register('username', {
                            required: "Username is required",
                            validate: async (value) => {
                                const isAvailable = await mockCheckUsername(value);
                                return isAvailable || "Username is already taken";
                            },
                        })}
                    />
                    {isValidating && (
                        <div>
                            Checking username...
                        </div>
                    )}
                    {showError('username') && (
                        <ErrorText>{errors.username.message}</ErrorText>
                    )}

                    <label>Country</label>
                    <Controller
                        name="country"
                        control={control}
                        rules={{ required: "Country is required" }}
                        render={({ field, fieldState }) => (
                            <>
                                <StyledSelect
                                    {...field}
                                    options={countries}
                                    value={field.value}
                                    onChange={(val) => field.onChange(val)}
                                    onBlur={field.onBlur}
                                />
                                {(fieldState.isTouched || isSubmitted) && fieldState.error && (
                                    <ErrorText>{fieldState.error.message}</ErrorText>
                                )}
                            </>
                        )}
                    />
                    <label>Hobbies</label>
                    {fields.map((field, index) => (
                        <section key={field.id} >
                            <StyledInput
                                {...register(`hobbies.${index}.name`, {
                                    required: "Hobby is required"
                                })}
                                placeholder={`Hobby #${index + 1}`}
                            />
                            <RedButton onClick={() => remove(index)} text="Remove"/>
                        </section>
                    ))}
                    <div>
                        <Button
                            onClick={() => append({ name: '' })}
                            text="Add Hobby"
                        />
                    </div>
                </FormGroup>
            </FormContainer>
            <hr/>
            <div style={{ marginTop: 20 }}>
                <Button onClick={() => handleSubmit(onSubmit)()} text="Add" type="submit"/>
                <RedButton onClick={handleClose} text="Close" />
            </div>

        </>
    );
};

export default AddForm;
