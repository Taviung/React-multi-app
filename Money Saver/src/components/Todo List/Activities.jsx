import styles from "./Activities.module.css";
import ActivitiesRow from "./ActivitiesRow";


const Activities = ({activity, deleteActivity}) =>{

    return (
        <>
            <div>
                <h3 className="themeFontColor text-center">
                    Your current activities
                </h3>
            </div>
            <table styles={styles.table} className="table table-striped table-hover">
                <thead>
                    <tr>
                        <th scope="col">Task</th>
                        <th scope="col">Creation Date</th>
                        <th scope="col">End Date</th>
                    </tr>
                </thead>
                <tbody className="themeFontColorSecond">
                    {activity.map((item,index) => (
                        <ActivitiesRow key={index} item={item} onDelete={deleteActivity} />
                    ))}
                </tbody>
            </table>
        </>
    );
}

export default Activities;