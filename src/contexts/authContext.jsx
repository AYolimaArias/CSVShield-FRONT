import * as React from "react";
import { baseUrl, tokenKey } from "../constants";

const AuthContext = React.createContext({
  isAuthenticated: false,
  signup: () => {},
  login: () => {},
});

export function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = React.useState(false);

  React.useEffect(() => {
    const savedToken = window.localStorage.getItem(tokenKey);

    if (savedToken) {
      setIsAuthenticated(true);
    }
  }, []);

  async function login(email, password) {
    const options = {
      method: "POST",
      body: JSON.stringify({ email, password }),
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      const response = await fetch(baseUrl + "/login", options);
      console.log("Respuesta de la API:", response);
      if (response.ok) {
        const data = await response.json();
        const token = data.token;
        window.localStorage.setItem(tokenKey, token);
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function signup(name, email, password, role) {
    const options = {
      method: "POST",
      body: JSON.stringify({ name, email, password, role }),
      headers: {
        "Content-Type": "application/json",
      },
    };
    const response = await fetch(baseUrl + "/signup", options);

    if (response.ok) {
      const { token } = await response.json();
      window.localStorage.setItem(tokenKey, token);
      setIsAuthenticated(true);
      return;
    } else {
      const body = await response.json();
      const error =
        body.errors instanceof Array ? body.errors.join(", ") : body.errors;
      return Promise.reject(new Error(error));
    }
  }

  const value = {
    isAuthenticated,
    login,
    signup,
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return React.useContext(AuthContext);
}
