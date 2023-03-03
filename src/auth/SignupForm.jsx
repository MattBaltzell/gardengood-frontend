import React from "react";
import useFormFields from "../hooks/useFormFields";
import { useNavigate, Link } from "react-router-dom";
import "../components/Form/Form.css";

const SignupForm = ({ signup }) => {
  const INITIAL_STATE = {
    username: "",
    password: "",
    firstName: "",
    lastName: "",
    email: "",
    zipCode: "",
  };
  const { formData, setFormData, handleChange } = useFormFields(INITIAL_STATE);

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    signup(formData);
    setFormData(INITIAL_STATE);
    navigate("/");
  };

  return (
    <main className="Form">
      <div className="Home__bg"></div>

      <h1>Sign Up</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="username">Username</label>
        <input
          id="username"
          name="username"
          type="text"
          onChange={handleChange}
          value={formData.username}
        />
        <label htmlFor="password">Password</label>
        <input
          id="password"
          name="password"
          type="password"
          onChange={handleChange}
          value={formData.password}
        />
        <label htmlFor="firstName">First name</label>
        <input
          id="firstName"
          name="firstName"
          type="text"
          onChange={handleChange}
          value={formData.firstName}
        />
        <label htmlFor="lastName">Last name</label>
        <input
          id="lastName"
          name="lastName"
          type="text"
          onChange={handleChange}
          value={formData.lastName}
        />
        <label htmlFor="email">Email</label>
        <input
          id="email"
          name="email"
          type="email"
          onChange={handleChange}
          value={formData.email}
        />
        <label htmlFor="zipCode">Zip Code</label>
        <input
          id="zipCode"
          name="zipCode"
          type="text"
          pattern="[0-9]{5}"
          onChange={handleChange}
          value={formData.zipCode}
        />
        <button>Create Account</button>
      </form>
      <p>
        Already have an account? <Link to="/login">Log in</Link>
      </p>
    </main>
  );
};

export default SignupForm;
