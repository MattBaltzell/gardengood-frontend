import React from "react";
import useFormFields from "../hooks/useFormFields";
import { useNavigate, Link } from "react-router-dom";
import "../components/Form/Form.css";

const LoginForm = ({ login }) => {
  const INITIAL_STATE = { username: "", password: "" };
  const { formData, setFormData, handleChange } = useFormFields(INITIAL_STATE);

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    login(formData);
    setFormData(INITIAL_STATE);

    navigate("/");
  };

  return (
    <main className="Form">
      <div className="Home__bg"></div>

      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="username">Username</label>
        <input
          id="username"
          name="username"
          type="text"
          onChange={handleChange}
          value={formData.username}
          autoComplete="username"
        />
        <label htmlFor="password">Password</label>
        <input
          id="password"
          name="password"
          type="password"
          onChange={handleChange}
          value={formData.password}
          autoComplete="current-password"
        />
        <button>Submit</button>
      </form>
      <p>
        No Account? <Link to="/signup">Create one</Link>
      </p>
    </main>
  );
};

export default LoginForm;
