import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../services/LeaveService";
import "../assets/styles/login.css";
import "../assets/styles/global.css";

const Login = () => {
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const [error, setError] = useState();
  const navigate = useNavigate();
  
  /**
   * This function handle the user login process and redirect based on user role
   * @param {effect} event - It is the form submission effect
   */
  const userLogin = (event) => {
    // prevent the default value and page reload
    event.preventDefault();

    // Here we are calling the login function to authenticate the user and store the output in userType Variable
    const userType = login(username, password);
    // check if user is admin or employee and navigate accordinly
    if (userType) {
      if (userType.role === "admin") {
        //if user is admin then navigate to admin page
        navigate("/admin");
      } else {
        //if user is employe then navigate to dashboard
        navigate("/dashboard");
      }
    } else {
      // shows the error if username and password are wrong
      setError("Invalid username or password");
    }
  };

  return (
    <div className="lgnPage">
      <div className="lgnBox">
        <h2 className="title">Login</h2>
        <form onSubmit={userLogin}>
          <div className="inputBox">
            <label>Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="inputBox">
            <label>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          {error && <p className="error">{error}</p>}
          <button
            type="submit"
            className="button button-primary"
            style={{ width: "100%" }}
          >
            Login
          </button>
        </form>
        <p className="hintText">
          Try: <strong>user/user</strong> For Employe or{" "}
          <strong>admin/admin</strong> For Admin
        </p>
      </div>
    </div>
  );
};

export default Login;
