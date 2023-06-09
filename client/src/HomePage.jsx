import { Typography, Container, Box, Grid } from "@mui/material";

const HomePage = () => {
  return (
    <Box sx={{ backgroundColor: "#f5f5f5", minHeight: "100vh", py: 4 }}>
      <Container maxWidth="md">
        <Grid
          container
          spacing={3}
          justifyContent="center"
          alignItems="center"
          direction="column"
        >
          <Grid item>
            <Typography variant="h4" align="center" gutterBottom>
              Üdvözöllek a KérdőívKovácsban!
            </Typography>
          </Grid>
          <Grid item>
            <Typography variant="body1" align="center" paragraph>
              Az alkalmazás egy webes kérdőívkészítő, amely lehetővé teszi a
              felhasználók számára többlépéses kérdőívek létrehozását. A
              felhasználók kérdéseket adhatnak hozzá, és meghatározhatják a
              válaszlehetőségeket. Az elkészített kérdőívek táblázatban
              megjelennek, ahol a felhasználók módosíthatják, törölhetik vagy
              megoszthatják azokat egy link segítségével. A megosztott linken
              keresztül más felhasználók képesek lesznek kitölteni a
              kérdőíveket. Az alkalmazás lehetőséget nyújt a válaszok
              megjelenítésére egy külön felületen, ahol a felhasználók
              áttekinthetik a kérdésekre adott válaszokat. Ez az alkalmazás
              lehetővé teszi a könnyű és hatékony kérdőívek összeállítását,
              valamint a válaszok adminisztrációját és elemzését egy intuitív
              felhasználói felületen keresztül.
            </Typography>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default HomePage;
