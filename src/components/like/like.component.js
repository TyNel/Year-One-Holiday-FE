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

  const onClick = async () => {
    const userLiked = {
      recipesId: id,
      userId: userId,
      isLike: null,
    };

    findUserLiked.length === 1
      ? (userLiked.isLike = 0)
      : (userLiked.isLike = 1);
    const response = await axios.post(
      "https://yearonewebapi.azurewebsites.net/api/cookies/liked",
      userLiked
    );
    if (response.status === 200) {
      let likedRecipes = [...state.likedCount];
      findUserLiked.length === 0
        ? likedRecipes.push(response.data)
        : (likedRecipes[findLikedIndex] = response.data);
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
        <ThumbUpIcon color="success" onClick={onClick} />
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
