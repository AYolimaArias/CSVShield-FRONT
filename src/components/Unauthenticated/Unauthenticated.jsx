// import * as React from "react";
import React from "react";
import { useAuth } from "../../contexts/authContext";
import { useNavigate } from "react-router-dom";
import Button from "../Button";

const Unauthenticated = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

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
        navigate("/upload");
      })
      .catch((error) => {
        setStatus("error");
        console.error("Error during login:", error);
      });
  }

  const isLoading = status === "loading";

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <div className="">
            <label className="mt-1" htmlFor="email">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="alexa@example.com"
              value={formData.email}
              onChange={handleInputChange}
              required
              className="mt-1  border border-primary-500 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary-500 focus:border-primary-700 sm:text-sm font-display ml-2 pl-2"
            />
          </div>
          <div>
            <label className="mt-1" htmlFor="password">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              minLength={6}
              className="mt-1  border border-primary-500 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary-500 focus:border-primary-700 sm:text-sm font-display ml-2 pl-2"
            />
          </div>
        </div>

        <div className="flex justify-center mt-6">
          <Button
            variant="secondary"
            size="lg"
            type="submit"
            disabled={isLoading}
          >
            {isLoading ? "Loading..." : "Enter"}
          </Button>
        </div>
      </form>
    </div>
  );
};
export default Unauthenticated;
