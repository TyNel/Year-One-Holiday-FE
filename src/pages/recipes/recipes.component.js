import React, { useContext } from "react";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Container from "@mui/material/Container";
import RecipeItem from "../../components/recipe-item/recipe-item.component";
import Navbar from "../../components/navbar/navbar.component";
import { Context } from "../store/store.component";
import { useParams } from "react-router-dom";
import Typography from "@mui/material/Typography";
import RecipeForm from "../../components/recipe-form/recipe-form.component";

export default function Recipes() {
  const [state, dispatch] = useContext(Context);
  const { id } = useParams();
  const style = "contained";

  return (
    <div>
      <Navbar position="relative" />
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
            Recipe Page for {state.cookies[id - 1].cookieName} Cookies
          </Typography>
          <Stack
            sx={{ pt: 4 }}
            direction="row"
            spacing={2}
            justifyContent="center"
          >
            <RecipeForm buttonStyle={style} id={id} />
          </Stack>
        </Container>
      </Box>
      <Container>
        <Grid container spacing={4}>
          {state.recipes.map((recipe) => (
            <Grid item key={recipe.recipeId} xs={12} sm={6} md={4}>
              <RecipeItem
                imageUrl={state.cookies[id - 1].cookieImageUrl}
                description={recipe.description}
                url={recipe.url}
                name={recipe.websiteName}
                id={recipe.recipeId}
              />
            </Grid>
          ))}
        </Grid>
      </Container>
    </div>
  );
}
