import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Alert from "../../components/common/Alert";
import Button from "../../components/common/Button";
import Input from "../../components/common/Input";
import PageHeader from "../../components/layout/PageHeader";
import useAuth from "../../hooks/useAuth";
import { isEmailValid, isPasswordValid } from "../../utils/validators";
import "./Auth.css";

function Register() {
  const navigate = useNavigate();
  const { register } = useAuth();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((currentData) => ({ ...currentData, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!formData.name || !isEmailValid(formData.email) || !isPasswordValid(formData.password)) {
      setError("Please enter valid registration details.");
      return;
    }

    await register(formData);
    navigate("/");
  };

  return (
    <section className="auth-page">
      <div className="auth-card">
        <PageHeader
          title="Register"
          description="Create a customer account to place and track orders."
        />
        {error && <Alert type="warning">{error}</Alert>}
        <form onSubmit={handleSubmit}>
          <Input
            label="Full Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter your name"
          />
          <Input
            label="Email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your email"
          />
          <Input
            label="Password"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Create a password"
          />
          <Button type="submit">Register</Button>
        </form>
        <p>
          Already have an account? <Link to="/login">Login here</Link>
        </p>
      </div>
    </section>
  );
}

export default Register;
