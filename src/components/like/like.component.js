import React, { useState, useContext } from "react";
import ThumbUpAltOutlinedIcon from "@mui/icons-material/ThumbUpAltOutlined";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import { Context } from "../../pages/store/store.component";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

import axios from "axios";

export default function UserLiked({ id }) {
  const [state, dispatch] = useContext(Context);
  const userId = JSON.parse(localStorage.getItem("user")).userId;
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

  const [likeData, setLike] = useState(LIKED_STATE);
  const [dislikeData, setDislike] = useState(DISLIKED_STATE);

  const onClick = async () => {
    const data = likeData;
    const response = await axios.post(
      "https://yearonewebapi.azurewebsites.net/api/cookies/liked",
      data
    );
    if (response.status === 200) {
      let recipes = [...state.likedCount];
      recipes.push(response.data);

      dispatch({
        type: "SET_LIKED",
        payload: recipes,
      });
    }
  };

  const onDislikeClick = async () => {
    const data = dislikeData;
    const response = await axios.post(
      "https://yearonewebapi.azurewebsites.net/api/cookies/liked",
      data
    );
    if (response.status === 200) {
      let recipes = [...state.likedCount];
      recipes[findLikedIndex] = response.data;
      dispatch({
        type: "SET_LIKED",
        payload: recipes,
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
