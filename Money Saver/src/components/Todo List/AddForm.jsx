import InputField from "./InputFiled";
import Button, {RedButton} from "./Button";
import styled from 'styled-components';

const OrangeButtonWrapper = styled.div`
  button {
    color: ${({ theme }) => theme.buttonTextOrange};
  }
`;

const AddForm = ({addActivity, end, setEndDate, taskTitle, setTaskTitle, setShowForm}) =>{
    const closeModal = () => {
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
            <Button addAction={addActivity} text="Add" />
        </div>
        </OrangeButtonWrapper>
            <div>
                <RedButton addAction={closeModal} text="Close" />
            </div>
        <div>

        </div>
        </>
    );
}

export default AddForm;