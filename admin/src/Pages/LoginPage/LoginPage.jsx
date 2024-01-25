import React, { useReducer } from "react";
import "./LoginPage.css";

const loginReducer = (state, action) => {
  switch (action.type) {
    case "SET_EMAIL":
      return { ...state, email: action.payload };
    case "SET_PASSWORD":
      return { ...state, password: action.payload };
    default:
      return state;
  }
};

const Login = ({ onLogin }) => {
  // Initial state for the login form
  const initialState = {
    email: "",
    password: "",
  };

  // Use useReducer with the loginReducer function and initialState
  const [state, dispatch] = useReducer(loginReducer, initialState);

  // Action creators to dispatch actions
  const setEmail = (email) => {
    dispatch({ type: "SET_EMAIL", payload: email });
  };

  const setPassword = (password) => {
    dispatch({ type: "SET_PASSWORD", payload: password });
  };

  const login = async () => {
    let responsData;
    const formData = {
      email: state.email,
      password: state.password,
    };

    await fetch("http://localhost:4000/users/login", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((res) => res.json())
      .then((data) => (responsData = data));

    if (responsData.success) {
      localStorage.setItem("auth-token", responsData.token);
      localStorage.setItem("name", responsData.username);
      if (responsData.isAdmin) {
        return true;
      }
    } else {
      alert(responsData.error);
      return false;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Replace this with your actual authentication logic
    // For simplicity, I'm just checking if both fields are non-empty
    if (state.email && state.password) {
      const isAdmin = await login();
      if (isAdmin) {
        onLogin();
      } else {
        alert("You are not an admin");
      }
      // Call the onLogin function passed from the parent component
    } else {
      alert("Please enter both email and password");
    }
  };

  return (
    <div className="loginpage">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="text"
            id="email"
            value={state.email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={state.password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
