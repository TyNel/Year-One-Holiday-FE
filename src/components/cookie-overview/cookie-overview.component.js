import React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

export default function CookieOverview({ cookieName, imageUrl }) {
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
        <Button size="small" color="success">
          Add Recipe
        </Button>
        <Button size="small" color="error">
          View Recipes
        </Button>
      </CardActions>
    </Card>
  );
}
