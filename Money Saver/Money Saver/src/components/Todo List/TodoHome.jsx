import Activities from "./Activities";
import AddForm from "./AddForm";
import { useState } from "react";
import Button from "./Button";
import { Outlet } from "react-router-dom";
import { useActivity } from "./ActivityContext.jsx";

function TodoHome() {
    const { activity, setActivity } = useActivity();
    const [taskTitle, setTaskTitle] = useState("");
    const [end, setEndDate] = useState("");
    const [showForm, setShowForm] = useState(false);

    const addActivity = () => {
        if (!taskTitle || !end) return alert("Please insert both");

        const newActivity = {
            id: activity.reduce((max, item) => Math.max(max, item.id), 0) + 1,
            task: taskTitle,
            creationDate: new Date().toISOString().split('T')[0],
            endDate: end
        };

        setActivity([...activity, newActivity]);
        setEndDate("");
        setTaskTitle("");
        setShowForm(false);

    };

    const deleteActivity = (itemToBeDeleted) => {

        const updated = activity.filter(item => item !== itemToBeDeleted);
        setActivity(updated);
    };

    const showModal = () => {
        setShowForm(true);
    };
    return (
        <>
            <div>
                <Activities activity={activity} onDelete={deleteActivity} />
                <Button onClick={showModal} text="Add task" />

                {showForm && (
                    <AddForm
                        addActivity={addActivity}
                        end={end}
                        setEndDate={setEndDate}
                        taskTitle={taskTitle}
                        setTaskTitle={setTaskTitle}
                        setShowForm={setShowForm}
                    />
                )}
                <Outlet />
            </div>
        </>
    );
}

export default TodoHome;
