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
import { toast } from "react-toastify";

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

export default function RecipeForm(props) {
  const [state, dispatch] = useContext(Context);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    formik.resetForm();
    setOpen(false);
  };
  const id = props.id;

  const initialValues = {
    cookieType: id,
    url: "",
    description: "",
    websiteName: "",
  };

  const validationSchema = yup.object({
    url: yup
      .string("Please provide an image")
      .url("Url is not valid")
      .required("Image is required"),
    description: yup.string("Please enter description"),
    websiteName: yup
      .string("Please enter website name")
      .min(2, "Website name must be at least 2 characters")
      .required("Website name required"),
  });

  const onSubmit = async (values) => {
    try {
      const response = await axios.post(
        "https://yearonewebapi.azurewebsites.net/api/cookies/addRecipe",
        values
      );
      if (response.status === 200) {
        toast.success("Recipe Added");
        let currentRecipes = [...state.recipes];
        currentRecipes.push(response.data);
        dispatch({
          type: "SET_RECIPES",
          payload: currentRecipes,
        });
        handleClose();
      }
    } catch (error) {
      toast.error("Recipe Add Error");
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
      <Button color="success" onClick={handleOpen}>
        Add Recipe
      </Button>
      <Modal open={open} onClose={handleClose}>
        <FormControl onSubmit={formik.handleSubmit} sx={style}>
          <Box component="form">
            <Typography component="h1" variant="h5">
              Add Recipe
            </Typography>
            <TextField
              margin="normal"
              required
              fullWidth
              color="success"
              label="Recipe Url"
              name="url"
              value={formik.values.url}
              onChange={formik.handleChange}
              error={formik.touched.url && Boolean(formik.errors.url)}
              helperText={formik.touched.url && formik.errors.url}
            />
            <TextField
              margin="normal"
              fullWidth
              color="success"
              label="Description (optional)"
              name="description"
              value={formik.values.description}
              onChange={formik.handleChange}
              error={
                formik.touched.description && Boolean(formik.errors.description)
              }
              helperText={
                formik.touched.description && formik.errors.description
              }
            />
            <TextField
              margin="normal"
              fullWidth
              color="success"
              label="Website Name"
              name="websiteName"
              value={formik.values.websiteName}
              onChange={formik.handleChange}
              error={
                formik.touched.websiteName && Boolean(formik.errors.websiteName)
              }
              helperText={
                formik.touched.websiteName && formik.errors.websiteName
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
