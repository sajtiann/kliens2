import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Typography, Button } from "@mui/material";
import { useSelector } from "react-redux";
import { selectAuthToken } from "./state/authSlice.js";

const SurveyPage = () => {
  const token = useSelector(selectAuthToken);

  const { hash } = useParams();
  const [surveyData, setSurveyData] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [answers, setAnswers] = useState([]);

  const fetchSurveyData = async () => {
    try {
      const response = await fetch(
        `http://localhost:3030/surveys?hash=${hash}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await response.json();

      if (response.ok && data.total > 0) {
        const survey = data.data[0];
        setSurveyData(survey);
        initializeAnswers(survey.content);
      } else {
        console.error("Survey not found");
      }
    } catch (error) {
      console.error("Error fetching survey data:", error);
    }
  };

  const initializeAnswers = (content) => {
    const pages = content.split("\n\n");
    const initialAnswers = pages.map(() => ({ filled: false, values: [] }));

    setAnswers(initialAnswers);
  };

  const handleInputChange = (e, questionIndex) => {
    const newAnswers = [...answers];
    newAnswers[currentPage].filled = newAnswers[currentPage].values.every(
      (value, index) => index === questionIndex || value.trim() !== ""
    );
    newAnswers[currentPage].values[questionIndex] = e.target.value;

    setAnswers(newAnswers);
  };

  const handleNextPage = () => {
    const currentPageAnswers = answers[currentPage];

    if (
      currentPage < surveyData.content.length - 1 &&
      currentPageAnswers.filled
    ) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleSubmit = () => {
    if (answers.every((page) => page.filled)) {
      console.log("Submitting answers:", answers);
    } else {
      console.error("Please fill out all the fields before submitting");
    }
  };

  useEffect(() => {
    fetchSurveyData();
  }, []);

  if (!surveyData) {
    return <div>Loading...</div>;
  }

  const pages = surveyData.content.split("\n\n").slice(1);
  const currentPageContent = pages[currentPage];

  return (
    <div>
      <Typography variant="h4" gutterBottom>
        {surveyData.name}
      </Typography>
      <Typography variant="h6" gutterBottom>
        Lap {currentPage + 1} / {pages.length}
      </Typography>
      {currentPageContent.split("\n").map((content, index) => {
        if (content.startsWith("Question") || content.startsWith("Page")) {
          const questionIndex = index - 1;
          return (
            <div key={index} style={{ marginBottom: "1rem" }}>
              <Typography variant="body1">{content}</Typography>
              {content.startsWith("Question") && (
                <input
                  type="text"
                  value={answers[currentPage]?.values[questionIndex] || ""}
                  onChange={(e) => handleInputChange(e, questionIndex)}
                />
              )}
            </div>
          );
        } else if (content.trim() === "") {
          return <br key={index} />;
        } else {
          return null;
        }
      })}

      <div>
        <Button
          variant="contained"
          color="primary"
          disabled={currentPage === 0}
          onClick={handlePreviousPage}
        >
          Előző
        </Button>
        <Button
          variant="contained"
          color="primary"
          disabled={
            currentPage === pages.length - 1 || !answers[currentPage]?.filled
          }
          onClick={handleNextPage}
        >
          Következő
        </Button>
        {currentPage === pages.length - 1 &&
          answers.every((page) => page.filled) && (
            <Button variant="contained" color="primary" onClick={handleSubmit}>
              Beküldés
            </Button>
          )}
      </div>
    </div>
  );
};

export default SurveyPage;
