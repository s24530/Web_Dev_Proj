import React, { useState } from "react";
import Navbar from "./Components/Navbar/Navbar";
import Admin from "./Pages/Admin/Admin";
import LoginPage from "./Pages/LoginPage/LoginPage"; // Assuming you have a Login component

const App = () => {
  const [isLoggedIn, setLoggedIn] = useState(false);

  const handleLogin = () => {
    // Implement your authentication logic here
    // For simplicity, I'm just setting isLoggedIn to true
    setLoggedIn(true);
  };

  const handleLogout = () => {
    // Implement your logout logic here
    setLoggedIn(false);
  };

  return (
    <div>
      <Navbar isLoggedIn={isLoggedIn} onLogout={handleLogout} />
      {isLoggedIn ? <Admin /> : <LoginPage onLogin={handleLogin} />}
    </div>
  );
};

export default App;
