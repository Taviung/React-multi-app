import InputField from "./InputFiled";
import Button, {RedButton} from "./Button";
import styled from 'styled-components';
import {useEffect, useState} from "react";

const OrangeButtonWrapper = styled.div`
  button {
    color: ${({ theme }) => theme.buttonTextOrange};
  }
`;

const AddForm = ({addActivity, end, setEndDate, taskTitle, setTaskTitle, setShowForm}) =>{

    const [isUnsaved, setIsUnsaved] = useState(false);

    useEffect(() => {
        const hasChanges = taskTitle.trim() !== "" || end.trim() !== "";
        setIsUnsaved(hasChanges);
    }, [taskTitle, end]);

    useEffect(() => {
        const handleBeforeUnload = (e) => {
            if (isUnsaved) {
                e.preventDefault();
            }
        };

        window.addEventListener("beforeunload", handleBeforeUnload);
        return () => {
            window.removeEventListener("beforeunload", handleBeforeUnload);
        };
    }, [isUnsaved]);

    const closeModal = () => {
        if (isUnsaved) {
            const confirmClose = window.confirm("You have unsaved changes. Do you want to close?");
            if (!confirmClose) return;
        }

        setShowForm(false);
        setTaskTitle("");
        setEndDate("");
    }

    return (
        <>
        <OrangeButtonWrapper>
        <div className="modal-content">
            <h3 className="themeFontColor text-center">Add a new activity</h3>
            <InputField headerText="Input End Date" type="date" value={end} onChange={(e) => setEndDate(e.target.value)} />
            <InputField headerText="Input Task Name" type="text" value={taskTitle} onChange={(e) => setTaskTitle(e.target.value)} />
            <Button onClick={addActivity} text="Add" />
        </div>
        </OrangeButtonWrapper>
            <div>
                <RedButton onClick={closeModal} text="Close" />
            </div>
        <div>

        </div>
        </>
    );
}

export default AddForm;