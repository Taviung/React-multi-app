import {useParams, useNavigate, Outlet} from "react-router-dom";
import styled from "styled-components";
import Button, {RedButton} from "./Button.jsx";
import {useActivity} from "./ActivityContext.jsx";

const StyledTaskDetail = styled.div`
    background: ${({theme})=>theme.background};
    color: ${({theme})=>theme.text};
`
const TaskDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { activity } = useActivity();

    const task = activity.find(item => item.id === Number(id));

    if (!task) {
        return <div>Task not found</div>;
    }
    return (
        <StyledTaskDetail>
            <div style={{ padding: "1rem"}}>
                <p>Task: {task.task}</p>
                <p>Created: {task.creationDate}</p>
                <p>End Date: {task.endDate}</p>
                <Button onClick={() => navigate(`/todos`)} text={"Back"}/>
                <Button onClick={() => navigate(`/todos/edit/${task.id}`)} text="Edit" />
            </div>
        </StyledTaskDetail>
    );
};

export default TaskDetail;
