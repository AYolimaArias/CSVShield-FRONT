import React from "react";
import { useAuth } from "../contexts/authContext";
import Button from "../components/Button/";

const Signup = () => {
  const { signup } = useAuth();

  const [status, setStatus] = React.useState("idle");
  const [signUpErrors, setSignUpErrors] = React.useState(null);
  const [formData, setFormData] = React.useState({
    name: "",
    email: "",
    password: "",
    role: "admin",
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
      <div>
        {hasError && (
          <div className=" border-primary-500 rounded-md bg-red-300 pr-3 pl-3">
            <p className={["error-message"]}>
              {signUpErrors || "Invalid Credentials"}
            </p>
          </div>
        )}
        {status === "success" && (
          <p className=" border-primary-500 rounded-md bg-green-300 pr-3 pl-3">
            Your Account was created successfully. You can login now
          </p>
        )}
      </div>
      <div className="flex justify-center">
        <form onSubmit={handleSubmit}>
          <div className="flex ">
            <label className="mt-1" htmlFor="name">
              Name
            </label>
            <input
              id="name"
              type="name"
              name="name"
              placeholder="Alexandra Martinez"
              value={formData.name}
              onChange={handleInputChange}
              required
              className="mt-1  border border-primary-500 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary-500 focus:border-primary-700 sm:text-sm font-display ml-2 pl-2"
            />
          </div>

          <div>
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

          <div>
            <label className="mt-1" htmlFor="role">
              Role
            </label>
            <input
              type="role"
              id="role"
              name="role"
              value={formData.role}
              onChange={handleInputChange}
              className="mt-1  border border-primary-500 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary-500 focus:border-primary-700 sm:text-sm font-display ml-2 pl-2"
            />
          </div>

          <div className="flex justify-center mt-6">
            <Button
              variant="secondary"
              size="lg"
              type="submit"
              disabled={isLoading}
            >
              {isLoading ? "Loading..." : "Create"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};
export default Signup;
