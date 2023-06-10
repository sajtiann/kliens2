import { useRef } from "react";
import { useState } from "react";

import { Container, Typography, TextField, Button } from "@mui/material";
import { useDispatch } from "react-redux";
import { login } from "../state/authSlice";
import { useNavigate } from "react-router";
import { useLoginMutation } from "../state/authApiSlice.js";

const Login = () => {
  const [apilogin, data] = useLoginMutation();
  console.log(data);
  const [errors, setErrors] = useState({
    email: null,
    password: null,
  });
  console.log(errors);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // Ref
  const emailRef = useRef();
  const passwordRef = useRef();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    const newErrors = {};
    if (email === "") {
      newErrors.email = "email is required!";
    }
    if (password === "") {
      newErrors.password = "Password is required!";
    }
    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) {
      return;
    }
    try {
      const result = await apilogin({
        email: email,
        password: password,
        strategy: "local",
      }).unwrap();
      dispatch(
        login({
          user: result.user,
          token: result.accessToken,
        })
      );
      navigate("/", { replace: true });
    } catch (e) {
      console.log("Hibaaaaaaaaaaaaaa", e);
      console.log(email);
      console.log(password);
      newErrors.email = "Login failed!";
      setErrors(newErrors);
    }
  };
  return (
    <Container maxWidth="sm">
      <Typography variant="h4" align="center" gutterBottom>
        Bejelentkezés
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Email"
          name="email"
          defaultValue=""
          type="email"
          inputRef={emailRef}
          autoFocus
          fullWidth
          required
        />
        {/* {errors.email && <span>{errors.email}</span>} */}
        <br />
        <TextField
          label="Jelszó"
          name="password"
          defaultValue=""
          type="password"
          inputRef={passwordRef}
          autoFocus
          fullWidth
          required
        />
        {/* {errors.password && <span>{errors.password}</span>} */}
        <br />
        <Button type="submit" variant="contained" color="primary" fullWidth>
          Bejelentkezés
        </Button>
      </form>
    </Container>
  );
};

export default Login;
