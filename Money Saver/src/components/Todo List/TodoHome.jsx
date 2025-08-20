
import Activities from "./Activities"
import AddForm from "./AddForm"
import { useState, useEffect} from "react"
import Button from "./Button"

const getInitialActivities = () => {
  const saved = localStorage.getItem("activities");
  if (saved) {
    return JSON.parse(saved);
  } else {
    return [
      {
        order: 1,
        task: "Complete React project",
        creationDate: "2025-08-05",
        endDate: "2025-10-05"
      },
      {
        order: 2,
        task: "Write documentation",
        creationDate: "2025-09-05",
        endDate: "2025-09-05"
      },
      {
        order: 3,
        task: "Deploy application",
        creationDate: "2025-09-05",
        endDate: "2025-12-30"
      }
    ];
  }
};


function TodoHome() {
    const [activity, setActivity] = useState(getInitialActivities);
    const [taskTitle, setTaskTitle] = useState("");
    const [end, setEndDate] = useState("");
    const [showForm, setShowForm] = useState(false);

    useEffect(() => {
        localStorage.setItem("activities", JSON.stringify(activity));
    }, [activity]);

    const addActivity = () => {
      if (!taskTitle || !end) return alert("Please insert both");

      const newActivity = {
        order: activity.length + 1,
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
      <Activities activity={activity} deleteActivity={deleteActivity} />
      <Button addAction={showModal} text="Add activity"/>

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
      </div>
    </>
  )
}

export default TodoHome;
