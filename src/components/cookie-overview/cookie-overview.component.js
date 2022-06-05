import { useContext } from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import RecipeForm from "../recipe-form/recipe-form.component";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Context } from "../../pages/store/store.component";

export default function CookieOverview({ cookieName, imageUrl, id }) {
  const [state, dispatch] = useContext(Context);
  const navigate = useNavigate();
  const onClick = async () => {
    try {
      const response = await axios.get(
        "https://yearonewebapi.azurewebsites.net/api/cookies/recipe",
        {
          params: { id },
        }
      );
      if (response.status === 200) {
        localStorage.setItem("recipes", JSON.stringify(response.data));
        dispatch({
          type: "SET_RECIPES",
          payload: response.data,
        });
        navigate(`/recipes/${id}`);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        component="img"
        alt="cookie"
        sx={{ height: 200 }}
        image={imageUrl}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {cookieName}
        </Typography>
      </CardContent>
      <CardActions>
        <RecipeForm id={id} />
        <Button onClick={onClick} color="error">
          View Recipes
        </Button>
      </CardActions>
    </Card>
  );
}
