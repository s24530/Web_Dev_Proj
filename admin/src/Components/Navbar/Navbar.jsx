import React from "react";
import "./Navbar.css";

const Navbar = ({ isLoggedIn }) => {
  const logout = () => {
    localStorage.removeItem("auth-token");
    localStorage.removeItem("name");
    window.location.replace("http://localhost:5173");
  };

  const handleButtonClick = () => {
    if (isLoggedIn) {
      logout();
    } else {
      window.location.replace("http://localhost:3000");
    }
  };

  return (
    <>
      <div className="navbar">
        <h1>Admin Pannel</h1>
        <button onClick={handleButtonClick}>
          {isLoggedIn ? "Logout" : "Go to Store"}
        </button>
      </div>
    </>
  );
};

export default Navbar;
