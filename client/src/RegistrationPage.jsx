import { useState } from "react";
import { Container, Typography, TextField, Button } from "@mui/material";

const RegistrationPage = () => {
  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    password: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Registration data submission to the server
    fetch("http://localhost:3030/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Registration successful!", data);
        // Handle further actions on successful registration
      })
      .catch((error) => {
        console.error("Error occurred during registration:", error);
        // Handle error during registration
      });
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" align="center" gutterBottom>
        Regisztráció
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Teljes név"
          name="fullname"
          value={formData.fullname}
          onChange={handleInputChange}
          fullWidth
          required
        />
        <TextField
          label="Email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleInputChange}
          fullWidth
          required
        />
        <TextField
          label="Jelszó"
          name="password"
          type="password"
          value={formData.password}
          onChange={handleInputChange}
          fullWidth
          required
        />
        <Button type="submit" variant="contained" color="primary" fullWidth>
          Regisztrálok
        </Button>
      </form>
    </Container>
  );
};

export default RegistrationPage;
