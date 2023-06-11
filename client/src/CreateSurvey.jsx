import { useState } from "react";
import { Typography, TextField, Button } from "@mui/material";
import { useSelector } from "react-redux";
import { selectAuthToken } from "./state/authSlice.js";

const NewSurveyPage = () => {
  const [surveyData, setSurveyData] = useState("");
  const token = useSelector(selectAuthToken);

  const handleSurveyDataChange = (event) => {
    setSurveyData(event.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (surveyData.trim() === "") {
      console.error("Survey data cannot be empty");
      return;
    }

    const surveyLines = surveyData.split("\n");

    const surveyName = surveyLines[0].trim();
    const pages = [];
    let currentPage = "";

    for (let i = 1; i < surveyLines.length; i++) {
      const line = surveyLines[i].trim();
      if (line.startsWith("Page")) {
        if (currentPage !== "") {
          pages.push(currentPage);
          currentPage = "";
        }
        currentPage += line + "\n";
      } else {
        currentPage += line + "\n";
      }
    }

    if (currentPage !== "") {
      pages.push(currentPage);
    }

    const newSurvey = {
      name: surveyName,
      content: pages.join("\n"),
    };

    try {
      const response = await fetch("http://localhost:3030/surveys", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(newSurvey),
      });
      const data = await response.json();

      if (response.ok) {
        const surveyId = data.id;
        const surveyHash = data.hash;

        console.log("New survey created with ID:", surveyId);
        console.log("Survey hash:", surveyHash);

        setSurveyData("");
      } else {
        console.error("Error creating new survey:", data.error);
      }
    } catch (error) {
      console.error("Error creating new survey:", error);
    }
  };

  return (
    <div>
      <Typography variant="h4" gutterBottom>
        Új kérdőív
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Kérdőív adatok"
          value={surveyData}
          onChange={handleSurveyDataChange}
          fullWidth
          multiline
          rows={10}
          required
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          style={{ marginTop: "1rem" }}
        >
          Mentés
        </Button>
      </form>
    </div>
  );
};

export default NewSurveyPage;
