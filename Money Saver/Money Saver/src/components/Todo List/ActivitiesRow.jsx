import {useNavigate} from "react-router-dom";
import {RedButton} from "./Button.jsx";

const ActivitiesRow = ({ item, onDelete}) => {
    const navigate = useNavigate();

    const handleClick = () => {
            navigate(`/todos/${item.id}`);
    };

    return (
        <>
            <tr onClick={handleClick}>
                <td>{item.task}</td>
                <td>{item.creationDate}</td>
                <td>{item.endDate}</td>
                <td><RedButton onClick={(e)=>{onDelete(item);
                    e.stopPropagation();
                }} text={"Delete"}/> </td>
            </tr>
        </>
    );
}

export default ActivitiesRow; 