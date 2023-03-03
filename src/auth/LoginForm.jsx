import React, { useContext } from "react";
import { useNavigate, Link, Navigate } from "react-router-dom";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { MyTextInput, MyPasswordInput } from "../components/Form/Forms";
import "../components/Form/Form.css";
import UserContext from "./UserContext";

const LoginForm = ({ login }) => {
  // Pass the useFormik() hook initial form values, a validate function that will be called when
  // form values change or fields are blurred, and a submit function that will
  // be called when the form is submitted
  const navigate = useNavigate();
  const currUser = useContext(UserContext);

  const INITIAL_STATE = {
    username: "",
    password: "",
  };

  return currUser ? (
    <Navigate to="/" />
  ) : (
    <main className="Form">
      <div className="Home__bg"></div>

      <h1>Login</h1>

      <Formik
        initialValues={{ ...INITIAL_STATE }}
        validationSchema={Yup.object({
          username: Yup.string()
            .max(25, "Must be 25 characters or less")
            .required("Required"),
          password: Yup.string()
            .min(8, "Must be 8 characters or more")
            .required("Required"),
        })}
        onSubmit={(values) => {
          setTimeout(() => {
            login(values);
            navigate("/");
          }, 400);
        }}
      >
        <Form>
          <MyTextInput label="Username" name="username" type="text" />
          <MyPasswordInput label="Password" name="password" type="password" />
          <button type="submit">Log In</button>
        </Form>
      </Formik>

      <p>
        No Account? <Link to="/signup">Create one</Link>
      </p>
    </main>
  );
};

export default LoginForm;
