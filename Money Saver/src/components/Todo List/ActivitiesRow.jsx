
const ActivitiesRow = ({ item, onDelete }) => {
    const handleClick = () => {
            onDelete(item);
    };
    return (
        <tr onClick={handleClick} >
            <td>{item.task}</td>
            <td>{item.creationDate}</td>
            <td>{item.endDate}</td>
        </tr>
    );
}

export default ActivitiesRow; 