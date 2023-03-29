import React, { useContext, useState } from "react";
import { Link, useNavigate, Navigate } from "react-router-dom";
import "../form/Form.css";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { MyTextInput, MyPasswordInput } from "../form/Forms";
import UserContext from "./UserContext";
import { v4 as uuid } from "uuid";

const SignupForm = ({ signup, toast }) => {
  // Pass the useFormik() hook initial form values, a validate function that will be called when
  // form values change or fields are blurred, and a submit function that will
  // be called when the form is submitted
  const navigate = useNavigate();
  const currUser = useContext(UserContext);
  const [submissionErrors, setSubmissionErrors] = useState([]);

  const INITIAL_STATE = {
    username: "",
    password: "",
    firstName: "",
    lastName: "",
    email: "",
    zipCode: "",
  };

  return currUser ? (
    <Navigate to="/" />
  ) : (
    <main className="Form">
      <div className="Home__bg"></div>

      <h1>Sign Up</h1>

      <Formik
        initialValues={{ ...INITIAL_STATE }}
        validationSchema={Yup.object({
          username: Yup.string()
            .max(25, "Must be 25 characters or less")
            .required("Required"),
          password: Yup.string()
            .min(8, "Must be 8 characters or more")
            .required("Required"),
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
          setSubmissionErrors([]);
          setTimeout(async () => {
            const res = await signup(values);
            if (res.message) {
              setSubmissionErrors((errors) => [...errors, res.message]);
            }
          }, 400);
        }}
      >
        <Form>
          <MyTextInput
            label="Username"
            name="username"
            type="text"
            autoComplete="username"
          />
          <MyTextInput
            label="Email"
            name="email"
            type="text"
            autoComplete="email"
          />
          <MyPasswordInput label="Password" name="password" type="password" />
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
          <button type="submit">Create Account</button>
        </Form>
      </Formik>
      <p>
        Already have an account? <Link to="/login">Log in</Link>
      </p>
    </main>
  );
};

export default SignupForm;
