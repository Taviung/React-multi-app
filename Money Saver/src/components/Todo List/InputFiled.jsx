import styles from "./Activities.module.css";

const InputField = ({ headerText, value, type, onChange }) =>{
    return (
        <>
        <input
            class={styles.input}
            type={type}
            value={value}
            id={headerText}
            name={headerText}
            onChange={onChange}
            placeholder={headerText}
            />
        </>
        
    );
}

export default InputField;