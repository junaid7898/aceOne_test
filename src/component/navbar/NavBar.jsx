import React from "react";
import "./navbar.css";

const NavBar = ({ option, setOption }) => {
  return (
    <nav className="navbar">
      <h1 className="heading">App Logo</h1>

      {option === "login" ? (
        <button
          className=" btn"
          onClick={() => {
            setOption("logout");
          }}
        >
          Login
        </button>
      ) : (
        <button
          className=" btn"
          onClick={() => {
            setOption("login");
          }}
        >
          Logout
        </button>
      )}
    </nav>
  );
};

export default NavBar;
