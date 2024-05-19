// import * as React from "react";
import React from "react";
import { useAuth } from "../../contexts/authContext";
import { Link } from "react-router-dom";
// import { Link } from "react-router-dom";

const Unauthenticated = () => {
  const { login, isAuthenticated } = useAuth();

  const [status, setStatus] = React.useState("idle");
  const [formData, setFormData] = React.useState({
    email: "",
    password: "",
  });
  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  function handleSubmit(event) {
    event.preventDefault();

    setStatus("loading");
    const { email, password } = formData;

    login(email, password)
      .then(() => {
        setStatus("success");
      })
      .catch((error) => {
        setStatus("error");
        console.error("Error during login:", error);
      });
  }

  function handleSubmit2(event) {
    event.preventDefault();
    const { email, password } = formData;

    const options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    };

    fetch("https://csvshield.onrender.com/login", options)
      .then((response) => response.json())
      .then((response) => console.log(response))
      .catch((err) => console.error(err));
  }
  const isLoading = status === "loading";

  return (
    <div>
      <form onSubmit={handleSubmit}>
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
          {isAuthenticated ? (
            <Link to="/upload">
              {" "}
              <button type="submit" disabled={isLoading}>
                {isLoading ? "Loading..." : "Enter"}
              </button>
            </Link>
          ) : (
            <Unauthenticated />
          )}
        </div>
      </form>
    </div>
  );
};
export default Unauthenticated;
