import React from "react";
import { FormGroup, FormFeedback } from "reactstrap";
import { ErrorMessage } from "formik";
import { Input } from "antd";
import { fontSize } from "@mui/system";
const InputField = (props) => {
  const { field, label, placeholder, form, type, disabled, min, icon } = props;
  const { name } = field;
  const { errors, touched } = form;
  const showError = errors[name] && touched[name];
  return (
    <FormGroup>
      <label for={name}>{label}</label>
      <Input
        prefix={icon}
        id={name}
        {...field}
        placeholder={placeholder}
        type={type}
        disabled={disabled}
        invalid={showError}
        min={min}
      />
      {showError && (
        <p style={{ color: "red", fontSize: "14px" }}>
          <ErrorMessage name={name} />
        </p>
      )}
    </FormGroup>
  );
};

export default InputField;
