import { useState, useContext } from "react";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import { Context } from "../../pages/store/store.component";
import Button from "@mui/material/Button";
import { useFormik } from "formik";
import * as yup from "yup";
import axios from "axios";
import FormControl from "@mui/material/FormControl";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  spacing: 4,
};

export default function CookieForm() {
  const [state, dispatch] = useContext(Context);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    formik.resetForm();
    setOpen(false);
  };
  const initialValues = {
    cookieName: "",
    cookieImageUrl: "",
  };

  const validationSchema = yup.object({
    cookieName: yup
      .string("Please enter a name")
      .min(2, "Cookie name must be at least 2 characters")
      .required("Cookie name required"),
    cookieImageUrl: yup
      .string("Please provide an image")
      .url("Url is not valid")
      .required("Image is required"),
  });

  const onSubmit = async (values) => {
    try {
      const response = await axios.post(
        "https://yearonewebapi.azurewebsites.net/api/cookies/addCookie",
        values
      );
      if (response.status === 200) {
        console.log("Cookie Added!");
        let currentCookies = [...state.cookies];
        currentCookies.push(response.data);
        dispatch({
          type: "SET_COOKIES",
          payload: currentCookies,
        });
        handleClose();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
  });

  return (
    <div>
      <Button variant="contained" color="success" onClick={handleOpen}>
        Add a cookie
      </Button>
      <Modal open={open} onClose={handleClose}>
        <FormControl onSubmit={formik.handleSubmit} sx={style}>
          <Box component="form">
            <Typography component="h1" variant="h5">
              Add Cookie
            </Typography>
            <TextField
              margin="normal"
              required
              fullWidth
              color="success"
              label="Cookie Name"
              name="cookieName"
              value={formik.values.cookieName}
              onChange={formik.handleChange}
              error={
                formik.touched.cookieName && Boolean(formik.errors.cookieName)
              }
              helperText={formik.touched.cookieName && formik.errors.cookieName}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              color="success"
              label="Image Url"
              name="cookieImageUrl"
              value={formik.values.cookieImageUrl}
              onChange={formik.handleChange}
              error={
                formik.touched.cookieImageUrl &&
                Boolean(formik.errors.cookieImageUrl)
              }
              helperText={
                formik.touched.cookieImageUrl && formik.errors.cookieImageUrl
              }
            />
            <Button
              type="submit"
              color="success"
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Add
            </Button>
            <Button
              type="submit"
              color="error"
              variant="contained"
              sx={{ mt: 3, mb: 2, ml: 2 }}
              onClick={handleClose}
            >
              Cancel
            </Button>
          </Box>
        </FormControl>
      </Modal>
    </div>
  );
}
