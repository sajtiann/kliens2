// import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./auth/Login.jsx";
import RequireAuth from "./auth/RequireAuth.jsx";
import Navigation from "./Navigation.jsx";
import HomePage from "./HomePage.jsx";
import RegistrationPage from "./RegistrationPage.jsx";
import { useSelector } from "react-redux";
import { selectLoggedInUser } from "./state/authSlice.js";
import MySurveys from "./MySurveys.jsx";
import Profile from "./Profile.jsx";

function App() {
  let user = useSelector(selectLoggedInUser);

  return (
    <BrowserRouter>
      <Navigation loggedIn={user} />
      <br />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<RegistrationPage />} />
        <Route
          path="/surveys"
          element={
            <RequireAuth>
              <MySurveys />
            </RequireAuth>
          }
        />
        <Route
          path="/answers"
          element={
            <RequireAuth>
              <HomePage />
            </RequireAuth>
          }
        />
        <Route
          path="/profile"
          element={
            <RequireAuth>
              <Profile />
            </RequireAuth>
          }
        />
        <Route
          path="/logout"
          element={
            <RequireAuth>
              <HomePage />
            </RequireAuth>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
