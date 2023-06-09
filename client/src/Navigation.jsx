/* eslint-disable react/prop-types */
import { AppBar, Toolbar, Typography, Button } from "@mui/material";
import { Link } from "react-router-dom";

const Navigation = ({ loggedIn }) => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          KérdőívKovács
        </Typography>
        {loggedIn ? (
          <>
            <Button color="inherit" component={Link} to="/">
              Kérdőíveim
            </Button>
            <Button color="inherit" component={Link} to="/answers">
              Válaszok
            </Button>
            <Button color="inherit" component={Link} to="/profile">
              Profil
            </Button>
            <Button color="inherit" component={Link} to="/logout">
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
