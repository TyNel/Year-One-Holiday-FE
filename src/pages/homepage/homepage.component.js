import { React, useEffect, useContext } from "react";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import CookieOverview from "../../components/cookie-overview/cookie-overview.component";
import Navbar from "../../components/navbar/navbar.component";
import { Context } from "../store/store.component";
import axios from "axios";
import CookieForm from "../../components/cookie-form/cookie-form.component";

export default function Homepage() {
  const [state, dispatch] = useContext(Context);

  useEffect(() => {
    if (state.cookies.length === 0) {
      async function getCookies() {
        let response = await axios.get(
          "https://localhost:5001/api/cookies/cookieType"
        );
        dispatch({
          type: "SET_COOKIES",
          payload: response.data,
        });
      }
      getCookies();
    }
  });
  return (
    <div>
      <Navbar position="relative" />
      <main>
        <Box
          sx={{
            bgcolor: "background.paper",
            pt: 8,
            pb: 6,
          }}
        >
          <Container maxWidth="sm">
            <Typography
              component="h1"
              variant="h2"
              align="center"
              color="text.primary"
              gutterBottom
            >
              Cookie Recipe Book
            </Typography>
            <Typography
              variant="h5"
              align="center"
              color="text.secondary"
              paragraph
            >
              I think most people can agree that there is at least one cookie
              they enjoy. So I created an app that allows people to share and
              add their favorite cookies along with different recipes.
            </Typography>
            <Stack
              sx={{ pt: 4 }}
              direction="row"
              spacing={2}
              justifyContent="center"
            >
              <CookieForm />
            </Stack>
          </Container>
        </Box>
        <Container sx={{ py: 8 }} maxWidth="md">
          <Grid container spacing={4}>
            {state.cookies.map((cookie) => (
              <Grid item key={cookie.cookieId} xs={12} sm={6} md={4}>
                <CookieOverview
                  cookieName={cookie.cookieName}
                  imageUrl={cookie.cookieImageUrl}
                  id={cookie.cookieId}
                />
              </Grid>
            ))}
          </Grid>
        </Container>
      </main>
    </div>
  );
}
