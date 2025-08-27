import {useNavigate, useParams, useBlocker } from "react-router-dom";
import {useCallback, useEffect, useState} from "react";
import styled from "styled-components";
import InputField from "./InputFiled.jsx";
import Button, {RedButton} from "./Button.jsx";
import {useActivity} from "./ActivityContext.jsx";

const EditWrapper = styled.div`
  background: ${({ theme }) => theme.background};
  color: ${({ theme }) => theme.text};
`;

export default function EditTask() {
    const {id} = useParams();
    const [taskTitle, setTaskTitle] = useState("");
    const [endDate, setEndDate] = useState("");
    const navigate = useNavigate();
    const { activity, setActivity } = useActivity();

    const shouldBlock = useCallback(
        () => taskTitle.trim() !== "" || endDate.trim() !== "",
        [taskTitle, endDate]
    );

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

    if (!activity) {
        return <div>Task not found</div>;
    }

    const editTask = () => {
        const updated = activity.map(item =>
            item.id === Number(id) ? { ...item, task: taskTitle, endDate } : item
        );
        setActivity(updated);
    };

    const cancelEdit = () => {

        navigate("/todos");
    }

    return (
        <>
            <EditWrapper>
                <h3 className="themeFontColor">Edit Task</h3>
                <InputField
                    headerText="Edit Task Name"
                    type="text"
                    value={taskTitle}
                    onChange={(e) => setTaskTitle(e.target.value)}
                />
                <InputField
                    headerText="Edit End Date"
                    type="date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                />
                <Button onClick={editTask} text="Save Changes" />
                <RedButton onClick={cancelEdit} text="Cancel" />
            </EditWrapper>
        </>
    );
}