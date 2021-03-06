import React, { useContext, useEffect, useCallback } from "react";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import CookieOverview from "../../components/cookie-overview/cookie-overview.component";
import Navbar from "../../components/navbar/navbar.component";
import { Context } from "../store/store.component";
import CookieForm from "../../components/cookie-form/cookie-form.component";
import axios from "axios";

export default function Homepage() {
  const [state, dispatch] = useContext(Context);

  const getCookies = useCallback(async () => {
    const response = await axios.get(
      "https://yearonewebapi.azurewebsites.net/api/cookies/cookieType"
    );
    if (response.status === 200) {
      localStorage.setItem("cookies", JSON.stringify(response.data));
      dispatch({
        type: "SET_COOKIES",
        payload: response.data,
      });
    }
  }, [dispatch]);

  useEffect(() => {
    if (state.cookies === null) {
      getCookies();
    }
  }, [getCookies, state.cookies]);

  return (
    <>
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
            {state.cookies?.map((cookie) => (
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
    </>
  );
}
