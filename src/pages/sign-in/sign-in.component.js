import { React, useEffect, useContext } from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import ParkIcon from "@mui/icons-material/Park";
import FormControl from "@mui/material/FormControl";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import * as yup from "yup";
import { useFormik } from "formik";
import axios from "axios";
import { Context } from "../store/store.component";
import { useNavigate } from "react-router-dom";

const theme = createTheme();

export default function SignIn() {
  const [state, dispatch] = useContext(Context);
  const navigate = useNavigate();

  const onSubmit = async (values) => {
    try {
      const userLogin = await axios.post(
        "https://localhost:5001/api/cookies/login",
        values
      );
      console.log(userLogin.data);
      if (userLogin.status === 200) {
        localStorage.setItem("user", JSON.stringify(userLogin.data));
        dispatch({
          type: "SET_USER",
          payload: userLogin.data,
        });
        const getcookies = await axios.get(
          "https://localhost:5001/api/cookies/cookieType"
        );
        if (getcookies.status === 200) {
          dispatch({
            type: "SET_COOKIES",
            payload: getcookies.data,
          });
          navigate("/homepage");
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const validationSchema = yup.object({
    email: yup
      .string("Please enter your email")
      .email("Enter a valid email")
      .required("Email is required"),
    password: yup
      .string("Please enter your password")
      .min(8, "Password must be at least 8 characters")
      .required("Password is required"),
  });

  const initialValues = {
    email: "",
    password: "",
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
  });

  return (
    <ThemeProvider theme={theme}>
      <Grid container component="main" sx={{ height: "100vh" }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: "url(https://bit.ly/3HhSh9H)",
            backgroundColor: (t) =>
              t.palette.mode === "light"
                ? t.palette.grey[50]
                : t.palette.grey[900],
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <ParkIcon color="success" fontSize="large" />
            <Typography style={{ color: "green" }} component="h1" variant="h5">
              Sign in
            </Typography>
            <FormControl onSubmit={formik.handleSubmit}>
              <Box component="form" noValidate sx={{ mt: 1 }}>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  color="success"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  error={formik.touched.email && Boolean(formik.errors.email)}
                  helperText={formik.touched.email && formik.errors.email}
                  autoFocus
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  color="success"
                  name="password"
                  label="Password"
                  type="password"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.password && Boolean(formik.errors.password)
                  }
                  helperText={formik.touched.password && formik.errors.password}
                  autoComplete="current-password"
                />
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                  color="error"
                >
                  Sign In
                </Button>
                <Grid container>
                  <Grid item xs>
                    <Link
                      href="/homepage"
                      variant="body2"
                      style={{ color: "green" }}
                    >
                      Continue as Guest
                    </Link>
                  </Grid>
                  <Grid item>
                    <Link
                      href="/signup"
                      variant="body2"
                      style={{ color: "green" }}
                    >
                      {"Don't have an account? Sign Up"}
                    </Link>
                  </Grid>
                </Grid>
              </Box>
            </FormControl>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}
