/* eslint-disable react/prop-types */
import { AppBar, Toolbar, Typography, Button } from "@mui/material";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "./state/authSlice.js";

const Navigation = ({ loggedIn }) => {
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          <Button color="inherit" component={Link} to="/">
            Kérdőívek
          </Button>
        </Typography>
        {loggedIn ? (
          <>
            <Button color="inherit" component={Link} to="/surveys">
              Kérdőíveim
            </Button>
            <Button color="inherit" component={Link} to="/answers">
              Válaszok
            </Button>
            <Button color="inherit" component={Link} to="/profile">
              Profil
            </Button>
            <Button color="inherit" component={Link} onClick={handleLogout}>
              Kijelentkezés
            </Button>
          </>
        ) : (
          <>
            <Button color="inherit" component={Link} to="/register">
              Regisztráció
            </Button>
            <Button color="inherit" component={Link} to="/login">
              Bejelentkezés
            </Button>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navigation;
