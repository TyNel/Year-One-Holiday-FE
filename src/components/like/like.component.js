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

  const findLikedCount = state.likedCount?.filter(
    (recipe) => recipe.likeParentId === id && recipe.isLike === 1
  );
  const findUserLiked = state.likedCount?.some(
    (recipe) =>
      recipe.userId === userId &&
      recipe.likeParentId === id &&
      recipe.isLike === 1
  );

  const findLikedIndex = state.likedCount?.findIndex(
    (recipe) =>
      recipe.isLike === 1 &&
      recipe.userId === userId &&
      recipe.likeParentId === id
  );

  const onClick = async () => {
    const userLiked = {
      likeParentId: id,
      userId: userId,
      isLike: null,
    };

    //if recipe is already liked by user set state to dislike
    findUserLiked === true ? (userLiked.isLike = 0) : (userLiked.isLike = 1);

    const response = await axios.post(
      "https://yearonewebapi.azurewebsites.net/api/cookies/liked",
      userLiked
    );
    if (response.status === 200) {
      let likedRecipes = [...state.likedCount];

      //if user hasn't voted for recipe yet, push to state. Otherwise update
      findUserLiked === false
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
      {findUserLiked ? (
        <ThumbUpIcon color="success" onClick={onClick} />
      ) : (
        <ThumbUpAltOutlinedIcon color="error" onClick={onClick} />
      )}
      <Typography
        color={findUserLiked ? "success" : "error"}
        sx={{ ml: "3px" }}
        variant="h6"
      >
        {findLikedCount.length}
      </Typography>
    </Box>
  );
}
