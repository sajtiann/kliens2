// import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navigation from "./Navigation.jsx";
import HomePage from "./HomePage.jsx";
import RegistrationPage from "./RegistrationPage.jsx";

function App() {
  return (
    <Router>
      <div>
        <Navigation loggedIn={false} />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="register" element={<RegistrationPage />} />
          <Route path="login" element={<HomePage />} />
          <Route path="answers" element={<HomePage />} />
          <Route path="profile" element={<HomePage />} />
          <Route path="logout" element={<HomePage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
