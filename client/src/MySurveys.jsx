import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectLoggedInUser } from "./state/authSlice.js";
import {
  Container,
  Typography,
  Button,
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
} from "@mui/material";
import { Link } from "react-router-dom";
import { storeSurveysAction, deleteSurveyAction } from "./state/authSlice.js";
import { selectAuthToken } from "./state/authSlice.js";

const useFetchSurveys = () => {
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

    fetchSurveys();
  }, [dispatch, loggedInUser.id, token]);

  return useSelector((state) => state.auth.surveys);
};

const MySurveys = () => {
  const surveys = useFetchSurveys();
  const dispatch = useDispatch();
  const token = useSelector(selectAuthToken);

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
  };

  const deleteSurvey = (surveyId) => {
    fetch(`http://localhost:3030/surveys/${surveyId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        if (response.ok) {
          dispatch(deleteSurveyAction(surveyId));
        } else {
          throw new Error("Failed to delete survey");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  if (!surveys) {
    return <div>Loading...</div>;
  }

  return (
    <Container>
      <Typography variant="h4" align="center" gutterBottom>
        Kérdőíveim
      </Typography>
      {surveys.length === 0 ? (
        <Typography variant="h5" align="center" gutterBottom>
          Nincs még kérdőív létrehozva
        </Typography>
      ) : (
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell align="center">Név</TableCell>
                <TableCell align="center">Dátum</TableCell>
                <TableCell align="center">Műveletek</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {surveys.map((survey) => (
                <TableRow key={survey.id}>
                  <TableCell>{survey.name}</TableCell>
                  <TableCell>
                    {new Date(survey.createdAt).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    <Button
                      component={Link}
                      to={`/survey/${survey.hash}`}
                      color="primary"
                    >
                      Kérdőív kitöltése
                    </Button>
                    <Button
                      component={Link}
                      to={`/survey/${survey.id}/edit`}
                      color="primary"
                    >
                      Kérdőív szerkesztése
                    </Button>
                    <Button onClick={() => copyToClipboard(survey.hash)}>
                      Link másolása
                    </Button>
                    <Button
                      component={Link}
                      to={`/survey/${survey.id}/answers`}
                      color="primary"
                    >
                      Válaszok megtekintése
                    </Button>
                    <Button
                      onClick={() => deleteSurvey(survey.id)}
                      color="primary"
                    >
                      Kérdőív törlése
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Container>
  );
};

export default MySurveys;
