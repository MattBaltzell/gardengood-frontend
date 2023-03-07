import { useField } from "formik";

/**
 * FORMIK INPUTS
 * */

export const MyTextInput = ({ label, ...props }) => {
  // useField() returns [formik.getFieldProps(), formik.getFieldMeta()]
  // which we can spread on <input>. We can use field meta to show an error
  // message if the field is invalid and it has been touched (i.e. visited)
  const [field, meta] = useField(props);
  return (
    <>
      <label htmlFor={props.id || props.name}>
        {label}
        {meta.touched && meta.error ? (
          <div className="error">{meta.error}</div>
        ) : null}
      </label>
      <input className="text-input" {...field} {...props} />
    </>
  );
};

export const MyPasswordInput = ({ label, ...props }) => {
  // useField() returns [formik.getFieldProps(), formik.getFieldMeta()]
  // which we can spread on <input>. We can use field meta to show an error
  // message if the field is invalid and it has been touched (i.e. visited)
  const [field, meta] = useField(props);
  return (
    <>
      {meta.touched && meta.error ? (
        <div className="error">{meta.error}</div>
      ) : null}
      <label htmlFor={props.id || props.name}>{label}</label>
      <input className="password-input" {...field} {...props} />
    </>
  );
};
