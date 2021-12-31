import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import UserLiked from "../like/like.component";
import Link from "@mui/material/Link";

export default function RecipeItem({ imageUrl, description, url, name, id }) {
  return (
    <Card sx={{ maxWidth: 345, height: "100%" }}>
      <CardHeader
        title={
          <Link href={url} underline="none" color="success" target="_blank">
            {name}
          </Link>
        }
      />
      <CardMedia
        component="img"
        height="150"
        image={imageUrl}
        alt="cookie image"
      />
      <CardContent sx={{ height: "7%" }}>
        <Typography variant="body2" color="text.secondary">
          {description === "" || description === null
            ? "No description added"
            : description}
        </Typography>
      </CardContent>
      <CardActions sx={{ display: "flex" }}>
        <IconButton aria-label="add to favorites">
          <UserLiked id={id} />
        </IconButton>
      </CardActions>
    </Card>
  );
}
