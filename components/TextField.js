import { ErrorMessage, useField } from "formik";
import styles from "../styles/utils.module.scss";

const TextField = ({ isInput, label, ...props }) => {
  const [field, meta] = useField(props);
  return (
    <div className={styles.textFieldContainer}>
      <label htmlFor={field.name} className={styles.label}>
        {label}
      </label>

      {isInput ? (
        <input
          className={`${meta.touched && meta.error && styles.inputError}`}
          autoComplete="off"
          {...field}
          {...props}
        />
      ) : (
        <textarea
          className={`${meta.touched && meta.error && styles.inputError}`}
          autoComplete="off"
          rows="5"
          {...field}
          {...props}
        ></textarea>
      )}
      {/* how error */}
      <ErrorMessage
        component="div"
        name={field.name}
        className={"" + styles.error}
      />
    </div>
  );
};

export default TextField;
