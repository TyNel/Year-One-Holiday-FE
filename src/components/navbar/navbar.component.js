import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import LogoutIcon from "@mui/icons-material/Logout";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  let user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();

  const onClick = () => {
    localStorage.clear();
    navigate("/signin");
  };
  const homePage = () => {
    navigate("/homepage");
  };
  return (
    <Box>
      <AppBar position="static" color="success">
        <Toolbar>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}
            onClick={homePage}
          >
            Happy Holidays {user.firstName ? user.firstName : " "}
          </Typography>
          <LogoutIcon onClick={onClick} />
        </Toolbar>
      </AppBar>
    </Box>
  );
}
