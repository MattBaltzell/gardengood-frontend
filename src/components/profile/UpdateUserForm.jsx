import React, { useContext, useState } from "react";
import { Link, useNavigate, Navigate } from "react-router-dom";
import "../form/Form.css";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { MyTextInput, MyPasswordInput } from "../form/Forms";
import UserContext from "../auth/UserContext";
import { v4 as uuid } from "uuid";

const SignupForm = ({ update, toast }) => {
  // Pass the useFormik() hook initial form values, a validate function that will be called when
  // form values change or fields are blurred, and a submit function that will
  // be called when the form is submitted
  const navigate = useNavigate();
  const currUser = useContext(UserContext);
  const [submissionErrors, setSubmissionErrors] = useState([]);

  const INITIAL_STATE = {
    firstName: currUser.firstName,
    lastName: currUser.lastName,
    email: currUser.email,
    zipCode: currUser.zipCode,
  };

  return !currUser ? (
    <Navigate to="/" />
  ) : (
    <main className="Form">
      <h1>Update information</h1>

      <Formik
        initialValues={{ ...INITIAL_STATE }}
        validationSchema={Yup.object({
          firstName: Yup.string()
            .max(25, "Must be 25 characters or less")
            .required("Required"),
          lastName: Yup.string()
            .max(30, "Must be 30 characters or less")
            .required("Required"),
          email: Yup.string()
            .email("Invalid email address")
            .required("Required"),
          zipCode: Yup.string()
            .length(5, "Must be exactly 5 characters")
            .required("Required"),
        })}
        onSubmit={(values) => {
          setTimeout(async () => {
            const username = currUser.username;
            const res = await update({ username, ...values });
            if (res.message.length > 0) {
              res.message.forEach((m) => {
                toast("error", m);
                setSubmissionErrors((errors) => [...errors, m]);
              });
            } else {
              navigate("/");
            }
          }, 400);
        }}
      >
        <Form>
          <MyTextInput
            label="Email"
            name="email"
            type="text"
            autoComplete="email"
          />
          <MyTextInput label="First Name" name="firstName" type="text" />
          <MyTextInput label="Last Name" name="lastName" type="text" />
          <MyTextInput
            label="Zip Code"
            name="zipCode"
            type="text"
            pattern="[0-9]{5}"
          />
          {submissionErrors
            ? submissionErrors.map((e) => (
                <div key={uuid()} className="error center">
                  {e}
                </div>
              ))
            : null}
          <button type="submit">Update Account</button>
        </Form>
      </Formik>
    </main>
  );
};

export default SignupForm;
