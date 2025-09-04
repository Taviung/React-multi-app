import Activities from "./Activities";
import Button from "./Button";
import { useActivity } from "./ActivityContext.jsx";
import {Link, Outlet, useNavigate} from "react-router-dom";

function TodoHome() {
    const { activity, setActivity } = useActivity();
    const navigate = useNavigate();

    const deleteActivity = (itemToBeDeleted) => {
        const updated = activity.filter(item => item !== itemToBeDeleted);
        navigate(`/todos`);
        setActivity(updated);
    };

    return (
        <>
            <div>
                <Activities activity={activity} onDelete={deleteActivity} />
                <Link to="/todos/add">
                    <Button text="Add task" />
                </Link>
                <Outlet onDelete={deleteActivity} />
            </div>
        </>
    );
}

export default TodoHome;
