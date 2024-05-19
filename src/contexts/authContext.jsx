import * as React from "react";
import { baseUrl, tokenKey } from "../constants";

const authContext = React.createContext({
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
        const { token } = await response.json({
          ok: true,
          message: "Login successful",
          token: token,
        });
        window.localStorage.setItem(tokenKey, token);
        setIsAuthenticated(true);
      } else {
        console.log(await response.text());
      }
    } catch (error) {
      console.log(error);
    }

    // } else {
    //   const body = await response.json();
    //   const error =
    //     body.errors instanceof Array ? body.errors.join(", ") : body.errors;
    //   console.error("Error en la respuesta de la API:", error);
    //   return Promise.reject(new Error(error));
    // }
  }
  // fetch("https://csvshield.onrender.com/login", {method:"POST", body:JSON.stringify({email: "angelica@gmail.com", password:"123456"}),headers:{"Content-Type": "application/json"} }).then((response)=>console.log(response))

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
  return <authContext.Provider value={value}>{children}</authContext.Provider>;
}

export function useAuth() {
  return React.useContext(authContext);
}
