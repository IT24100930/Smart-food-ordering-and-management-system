import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Alert from "../../components/common/Alert";
import Button from "../../components/common/Button";
import Input from "../../components/common/Input";
import PageHeader from "../../components/layout/PageHeader";
import useAuth from "../../hooks/useAuth";
import { isEmailValid, isPasswordValid } from "../../utils/validators";
import "./Auth.css";

function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((currentData) => ({ ...currentData, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!isEmailValid(formData.email) || !isPasswordValid(formData.password)) {
      setError("Enter a valid email and password with at least 6 characters.");
      return;
    }

    const user = await login(formData);
    navigate(user.role === "admin" ? "/admin" : "/");
  };

  return (
    <section className="auth-page">
      <div className="auth-card">
        <PageHeader
          title="Login"
          description="Use admin@smartfood.com with password admin123 to enter the admin dashboard."
        />
        {error && <Alert type="warning">{error}</Alert>}
        <form onSubmit={handleSubmit}>
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
            placeholder="Enter your password"
          />
          <Button type="submit">Login</Button>
        </form>
        <p>
          Don&apos;t have an account? <Link to="/register">Register here</Link>
        </p>
      </div>
    </section>
  );
}

export default Login;
