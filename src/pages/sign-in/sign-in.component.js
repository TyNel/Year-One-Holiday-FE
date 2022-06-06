import { React, useContext, useState } from "react";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import ParkIcon from "@mui/icons-material/Park";
import FormControl from "@mui/material/FormControl";
import * as yup from "yup";
import { useFormik } from "formik";
import axios from "axios";
import { Context } from "../store/store.component";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function SignIn() {
  const [state, dispatch] = useContext(Context);
  const navigate = useNavigate();
  const [loggedIn, setLoggedIn] = useState(false);

  const guestUser = {
    email: "Guest@test.com",
    password: "happyholidays",
  };

  const onSubmit = async (e) => {
    setLoggedIn(true);
    try {
      const userLogin = await axios.post(
        "https://yearonewebapi.azurewebsites.net/api/cookies/login",
        e.target?.id === "guestLogin" ? guestUser : formik.values
      );
      if (userLogin.status === 200) {
        toast.success("Login Successful");
        localStorage.setItem("user", JSON.stringify(userLogin.data));
        dispatch({
          type: "SET_USER",
          payload: userLogin.data,
        });
        navigate("/homepage");
      }
    } catch (error) {
      setLoggedIn(false);
      toast.error("Login Failed");
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
    <>
      <>
        {loggedIn ? (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "100vh",
            }}
          >
            <CircularProgress
              size="5rem"
              sx={{
                mx: "auto",
              }}
            />
          </Box>
        ) : (
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
            <Grid
              item
              xs={12}
              sm={8}
              md={5}
              component={Paper}
              elevation={6}
              square
            >
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
                <Typography
                  style={{ color: "green" }}
                  component="h1"
                  variant="h5"
                >
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
                      error={
                        formik.touched.email && Boolean(formik.errors.email)
                      }
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
                        formik.touched.password &&
                        Boolean(formik.errors.password)
                      }
                      helperText={
                        formik.touched.password && formik.errors.password
                      }
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
                          id="guestLogin"
                          variant="body2"
                          style={{ color: "green", cursor: "pointer" }}
                          onClick={onSubmit}
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
        )}
      </>
    </>
  );
}
