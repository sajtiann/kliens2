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
import CreateSurvey from "./CreateSurvey.jsx";
import SurveyPage from "./SurveyPage.jsx";

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
          path="/survey/:hash"
          element={
            <RequireAuth>
              <SurveyPage />
            </RequireAuth>
          }
        />
        <Route
          path="/surveys"
          element={
            <RequireAuth>
              <MySurveys />
            </RequireAuth>
          }
        />
        <Route
          path="/surveys/create"
          element={
            <RequireAuth>
              <CreateSurvey />
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
