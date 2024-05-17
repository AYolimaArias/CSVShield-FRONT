import * as React from "react";
import { useAuth } from "../../contexts/authContext";

const Unauthenticated = () => {
  const { login, signup } = useAuth();

  const [status, setStatus] = React.useState("idle");
  const [activeTab, setActiveTab] = React.useState("signup");
  const [signUpErrors, setSignUpErrors] = React.useState(null);
  const [formData, setFormData] = React.useState({
    name: "",
    email: "",
    password: "",
    role: "",
  });

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  function handleSubmit(event) {
    event.preventDefault();

    setStatus("loading");
    const { name, email, password, role } = formData;
    if (activeTab === "signup") {
      signup(name, email, password, role)
        .then(() => setStatus("success"))
        .catch((error) => {
          setStatus("error");
          setSignUpErrors(error.message);
        });
    } else {
      login(email, password)
        .then(() => setStatus("success"))
        .catch(() => setStatus("error"));
    }
  }

  function handleTabChange(tab) {
    setActiveTab(tab);
    setStatus("idle");
  }
  const isLoading = status === "loading";
  const buttonText = activeTab === "signup" ? "Create" : "Enter";
  const hasError = status === "error";

  return (
    <div>
      <div>
        <h1>Sistema de Carga de Datos</h1>
      </div>
      <div>
        <button onClick={() => handleTabChange("signup")}>Signup</button>
        <button onClick={() => handleTabChange("login")}>Login</button>
      </div>
      <form onSubmit={handleSubmit}>
        {activeTab === "signup" && (
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
        )}

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
        {activeTab === "signup" && (
          <div>
            <label htmlFor="role">Role</label>
            <select>
              <option value={formData.role} onChange={handleInputChange}>
                Admin
              </option>
              <option value={formData.role} onChange={handleInputChange}>
                User
              </option>
            </select>
          </div>
        )}

        <div>
          <button type="submit" disabled={isLoading}>
            {isLoading ? "Loading..." : buttonText}
          </button>
        </div>
      </form>
      {hasError && (
        <p className={s["error-message"]}>
          {signUpErrors || "Invalid Credentials"}
        </p>
      )}
    </div>
  );
};
export default Unauthenticated;
