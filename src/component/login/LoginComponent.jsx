import React, { useState } from "react";
import "./loginComponent.css";
import { axios } from "../../api/axiosInstance";
import { login } from "../../api/apiCalls";

const LoginComponent = ({ setUser, setIsLoading }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const res = await login(username, password);
    setUser(res);
  };
  return (
    <form className="login" onSubmit={(e) => handleLogin(e)}>
      <div className="login-input">
        <label htmlFor="username">username</label>
        <input
          type="text"
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Enter username"
          required
        />
      </div>
      <div className="login-input">
        <label htmlFor="password">password</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter password"
          required
        />
      </div>
      <button type="submit">Login</button>
    </form>
  );
};

export default LoginComponent;
