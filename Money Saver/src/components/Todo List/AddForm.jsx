import InputField from "./InputFiled";
import Button from "./Button";
import "./Activities.module.css";


const AddForm = ({addActivity, end, setEndDate, taskTitle, setTaskTitle, setShowForm}) =>{
    const closeModal = () => {
    setShowForm(false);
    setTaskTitle("");  
    setEndDate(""); 
    } 
     
    return (
        <>
        <div className="modal-content">
            <h3 className="themeFontColor text-center">Add a new activity</h3>
            <InputField headerText="Input End Date" type="date" value={end} onChange={(e) => setEndDate(e.target.value)} />
            <InputField headerText="Input Task Name" type="text" value={taskTitle} onChange={(e) => setTaskTitle(e.target.value)} />
            <Button addAction={addActivity} text="Add" />
            <Button addAction={closeModal} text="Close" />
        </div>
        </>
    );
}

export default AddForm;