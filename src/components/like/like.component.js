import React, { useContext } from "react";
import ThumbUpAltOutlinedIcon from "@mui/icons-material/ThumbUpAltOutlined";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import { Context } from "../../pages/store/store.component";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import axios from "axios";

export default function UserLiked({ id }) {
  const [state, dispatch] = useContext(Context);
  const userId = state.currentUser.userId;
  const findLiked = state.likedCount.filter((recipe) => {
    return recipe.recipeId === id && recipe.isLike === 1;
  });

  const findUserLiked = state.likedCount.filter((recipe) => {
    return (
      recipe.userId === userId && recipe.recipeId === id && recipe.isLike === 1
    );
  });

  const findLikedIndex = state.likedCount.findIndex(
    (recipe) =>
      recipe.isLike === 1 && recipe.userId === userId && recipe.recipeId === id
  );

  const LIKED_STATE = {
    recipesId: id,
    userId: userId,
    isLike: 1,
  };

  const DISLIKED_STATE = {
    recipesId: id,
    userId: userId,
    isLike: 0,
  };

  const onClick = async () => {
    const data = LIKED_STATE;
    const response = await axios.post(
      "https://yearonewebapi.azurewebsites.net/api/cookies/liked",
      data
    );
    if (response.status === 200 || response.status === 204) {
      console.log(response.data);
      let likedRecipes = [...state.likedCount];
      likedRecipes.push(response.data);
      localStorage.setItem("likedCount", JSON.stringify(likedRecipes));
      dispatch({
        type: "SET_LIKED",
        payload: likedRecipes,
      });
    }
  };

  const onDislikeClick = async () => {
    const data = DISLIKED_STATE;
    const response = await axios.post(
      "https://yearonewebapi.azurewebsites.net/api/cookies/liked",
      data
    );
    if (response.status === 200) {
      let likedRecipes = [...state.likedCount];
      likedRecipes[findLikedIndex] = response.data;
      localStorage.setItem("likedCount", JSON.stringify(likedRecipes));
      dispatch({
        type: "SET_LIKED",
        payload: likedRecipes,
      });
    }
  };

  return (
    <Box sx={{ display: "flex" }}>
      {findUserLiked.length === 1 ? (
        <ThumbUpIcon color="success" onClick={onDislikeClick} />
      ) : (
        <ThumbUpAltOutlinedIcon color="error" onClick={onClick} />
      )}
      <Typography
        color={findUserLiked.length === 1 ? "success" : "error"}
        sx={{ ml: "3px" }}
        variant="h6"
      >
        {findLiked.length}
      </Typography>
    </Box>
  );
}
