import styles from "./Activities.module.css";

const Button = ({ addAction, text}) => {
  return (
    <button onClick={addAction} className={styles.button}>
     {text}
    </button>
  );
};

export default Button;
