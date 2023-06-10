import { useSelector, useDispatch } from "react-redux";
import {
  selectLoggedInUser,
  storeSurveysAction,
  selectAuthToken,
  logout,
} from "./state/authSlice.js";
import { Container, Typography, Button } from "@mui/material";
import { useEffect } from "react";

const useFetchSurveys2 = () => {
  const loggedInUser = useSelector(selectLoggedInUser);
  const token = useSelector(selectAuthToken);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchSurveys = async () => {
      try {
        const response = await fetch(
          `http://localhost:3030/surveys?userId=${loggedInUser.id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const data = await response.json();
        dispatch(storeSurveysAction(data.data));
      } catch (error) {
        console.log(error);
      }
    };

    if (loggedInUser) {
      fetchSurveys();
    }
  }, [dispatch, loggedInUser, token]);

  const surveys = useSelector((state) => state.auth.surveys);
  return surveys || [];
};

const Profile = () => {
  const loggedInUser = useSelector(selectLoggedInUser);
  const surveys = useFetchSurveys2();
  console.log(surveys);

  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };

  if (!loggedInUser) {
    return <div>Nem vagy bejelentkezve.</div>;
  }

  const { fullname, email } = loggedInUser;

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" align="center" gutterBottom>
        Profil
      </Typography>
      <Typography variant="body1">
        <strong>Név:</strong> {fullname}
      </Typography>
      <Typography variant="body1">
        <strong>Email:</strong> {email}
      </Typography>
      <Typography variant="body1">
        <strong>Kérdőívek száma:</strong> {surveys.length}
      </Typography>
      <Button
        onClick={handleLogout}
        color="error"
        type="submit"
        variant="contained"
      >
        Kijelentkezés
      </Button>
    </Container>
  );
};

export default Profile;
