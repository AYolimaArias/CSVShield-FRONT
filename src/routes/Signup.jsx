import React from "react";
import { useAuth } from "../contexts/authContext";

const Signup = () => {
  const { signup } = useAuth();

  const [status, setStatus] = React.useState("idle");
  const [signUpErrors, setSignUpErrors] = React.useState(null);
  const [formData, setFormData] = React.useState({
    name: "",
    email: "",
    password: "",
    role: "user",
  });
  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  async function handleSubmit(event) {
    event.preventDefault();

    setStatus("loading");
    const { name, email, password, role } = formData;
    try {
      await signup(name, email, password, role);
      setStatus("success");
    } catch (error) {
      setStatus("error");
      setSignUpErrors(error.message);
    }
  }
  const isLoading = status === "loading";
  const hasError = status === "error";

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Name</label>
          <input
            id="name"
            type="name"
            name="name"
            placeholder="Alexandra Martinez"
            value={formData.name}
            onChange={handleInputChange}
            required
          />
        </div>

        <div>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="alexa@example.com"
            value={formData.email}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            minLength={6}
          />
        </div>

        <div>
          <label htmlFor="role">Role</label>
          <select
            id="role"
            name="role"
            value={formData.role}
            onChange={handleInputChange}
            required
          >
            <option>Admin</option>
            <option>User</option>
          </select>
        </div>

        <div>
          <button type="submit" disabled={isLoading}>
            {isLoading ? "Loading..." : "Create"}
          </button>
        </div>
      </form>
      {hasError && (
        <p className={["error-message"]}>
          {signUpErrors || "Invalid Credentials"}
        </p>
      )}
    </div>
  );
};
export default Signup;
