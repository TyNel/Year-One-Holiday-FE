import { useContext, useEffect } from "react";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import RecipeItem from "../../components/recipe-item/recipe-item.component";
import Navbar from "../../components/navbar/navbar.component";
import { Context } from "../store/store.component";
import { useParams } from "react-router-dom";
import axios from "axios";
import Typography from "@mui/material/Typography";

const theme = createTheme();

export default function Recipes() {
  const [state, dispatch] = useContext(Context);
  const localStorageCookies = JSON.parse(localStorage.getItem("cookies"));
  const { id } = useParams();
  const currentCookie = state.cookies.length
    ? state.cookies[id - 1].cookieImageUrl
    : "";

  useEffect(() => {
    if (state.recipes.length === 0) {
      async function getRecipes() {
        let response = await axios.get(
          "https://localhost:5001/api/cookies/recipe",
          {
            params: { id },
          }
        );
        if (response.status === 200) {
          dispatch({
            type: "SET_RECIPES",
            payload: response.data,
          });
        }
      }
      getRecipes();
    }
  });

  useEffect(() => {
    async function getLikes() {
      const likes = await axios.get(
        "https://localhost:5001/api/cookies/recipe/liked",
        {
          params: { id },
        }
      );
      if (likes.status === 200) {
        dispatch({
          type: "SET_LIKED",
          payload: likes.data,
        });
      }
    }
    getLikes();
  });

  return (
    <ThemeProvider theme={theme}>
      <Navbar position="relative" />
      <main>
        <Box
          sx={{
            bgcolor: "background.paper",
            pt: 8,
            pb: 6,
          }}
        >
          {" "}
          <Container maxWidth="sm">
            <Typography
              component="h4"
              variant="h4"
              align="center"
              color="text.primary"
              gutterBottom
            >
              Recipe Page for{" "}
              {state.cookies.length
                ? state.cookies[id - 1].cookieName
                : localStorageCookies[id - 1].cookieName}{" "}
              Cookies
            </Typography>
          </Container>
        </Box>
        <Container>
          <Grid container spacing={4}>
            {state.recipes.map((recipe) => (
              <Grid item key={recipe.recipeId} xs={12} sm={6} md={4}>
                <RecipeItem
                  imageUrl={
                    currentCookie.length ? currentCookie : "placeholder"
                  }
                  description={recipe.description}
                  url={recipe.url}
                  name={recipe.websiteName}
                  id={recipe.recipeId}
                />
              </Grid>
            ))}
          </Grid>
        </Container>
      </main>
    </ThemeProvider>
  );
}
