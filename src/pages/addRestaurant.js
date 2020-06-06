import React, { useState } from "react";
import { useHistory } from "react-router";
import { useDispatch, useSelector } from "react-redux";

//material-ui
import makeStyles from "@material-ui/core/styles/makeStyles";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";
import CircularProgress from "@material-ui/core/CircularProgress";

//custom-hook
import useForm from "../hooks/forms";

import { signupSeller } from "../redux/actions/authActions";

const useStyles = makeStyles((theme) => ({
  ...theme.spreadThis,
  root: {
    flexGrow: 1,
    marginTop: 40,
  },
  paper: {
    padding: theme.spacing(2),
  },
  address: {
    "& > *": {
      margin: theme.spacing(4),
      width: "25ch",
    },
  },
}));

export default function AddRestaurant() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();
  const [images, setImages] = useState({});
  let imageError;

  const { loading, serverError, errorsSeller } = useSelector(
    (state) => state.UI
  );

  const { message, errors } = errorsSeller || {};

  if (message) {
    if (message.includes("Upload an image")) imageError = message;
  }

  const handleFileSelect = (event) => {
    setImages(event.target.files);
  };

  //error variables
  let emailError = null;
  let passwordError = null;
  let confirmPasswordError = null;
  let streetError = null;
  let aptError = null;
  let localityError = null;
  let zipError = null;
  let phoneNoError = null;
  let nameError = null;
  let tagsError = null;
  let costForOneError = null;
  let minOrderError = null;
  let paymentError = null;

  if (errors) {
    for (let error of errors) {
      if (error.msg.includes("valid email")) emailError = error.msg;
      if (error.msg.includes("Email address already")) emailError = error.msg;
      if (error.msg.includes("least 6 characters long"))
        passwordError = error.msg;
      if (error.msg.includes("Passwords have to"))
        confirmPasswordError = error.msg;
      if (error.msg.includes("10 digit phone")) phoneNoError = error.msg;
      if (error.msg.includes("Minimum Order")) minOrderError = error.msg;
      if (error.msg.includes("Cost for one cannot"))
        costForOneError = error.msg;
      if (error.msg.includes("Zipcode cannot")) zipError = error.msg;
      if (error.msg.includes("Locality cannot")) localityError = error.msg;
      if (error.msg.includes("Apartment name cannot")) aptError = error.msg;
      if (error.msg.includes("Street cannot")) streetError = error.msg;
      if (error.msg.includes("Tags cannot")) tagsError = error.msg;
      if (error.msg.includes("Payment cannot be")) paymentError = error.msg;
      if (error.msg.includes("Restaurant Name")) nameError = error.msg;
    }
  }

  const signupSellerHandle = (props) => {
    const formData = new FormData();
    for (let i = 0; i < images.length; i++) {
      formData.append("images", images[i]);
    }
    formData.append("name", inputs.name);
    formData.append("email", inputs.email);
    formData.append("tags", inputs.tags);
    formData.append("costForOne", inputs.costForOne);
    formData.append("minOrderAmount", inputs.minOrderAmount);
    formData.append("street", inputs.street);
    formData.append("aptName", inputs.aptName);
    formData.append("locality", inputs.locality);
    formData.append("zip", inputs.zip);
    formData.append("phoneNo", inputs.phoneNo);
    formData.append("password", inputs.password);
    formData.append("confirmPassword", inputs.confirmPassword);
    formData.append("payment", inputs.payment);
    formData.append("role", "ROLE_SELLER");
    dispatch(signupSeller(formData, history));
  };

  const { inputs, handleInputChange, handleSubmit } = useForm(
    {
      name: "",
      email: "",
      tags: "",
      costForOne: "",
      minOrderAmount: "",
      street: "",
      aptName: "",
      locality: "",
      zip: "",
      phoneNo: "",
      payment: "",
      password: "",
      confirmPassword: "",
    },
    signupSellerHandle
  );

  return (
    <div className={classes.root}>
      <Grid container>
        <Grid item xs={1} />
        <Grid item xs={7}>
          <Paper className={classes.paper} elevation={2}>
            <Grid container>
              <Grid item sm>
                <Typography
                  variant="h4"
                  className={classes.title}
                  style={{ textAlign: "center" }}
                >
                  Add a Restaurant
                </Typography>
                <Typography
                  variant="body1"
                  component="p"
                  style={{ margin: "10px 10px 2px 10px" }}
                >
                  Basic Info - Get Started
                </Typography>
                <form noValidate onSubmit={handleSubmit}>
                  <TextField
                    id="restName"
                    name="name"
                    label="Restaurant Name"
                    className={classes.textField}
                    placeholder="Your restaurant name"
                    onChange={handleInputChange}
                    value={inputs.name}
                    helperText={nameError}
                    error={nameError ? true : false}
                    fullWidth
                    required
                  />
                  <TextField
                    id="email"
                    name="email"
                    label="Business Email"
                    placeholder="Your business Email"
                    className={classes.textField}
                    onChange={handleInputChange}
                    value={inputs.email}
                    helperText={emailError}
                    error={emailError ? true : false}
                    fullWidth
                    required
                  />
                  <TextField
                    id="tags"
                    name="tags"
                    label="Tags"
                    placeholder="North-Indian, Desserts, Bakery"
                    className={classes.textField}
                    onChange={handleInputChange}
                    value={inputs.tags}
                    helperText={tagsError}
                    error={tagsError ? true : false}
                    fullWidth
                    required
                  />
                  <TextField
                    id="costForOne"
                    name="costForOne"
                    label="Cost For One"
                    placeholder="Cost for single person"
                    className={classes.textField}
                    onChange={handleInputChange}
                    value={inputs.costForOne}
                    helperText={costForOneError}
                    error={costForOneError ? true : false}
                    type="number"
                    fullWidth
                    required
                  />
                  <TextField
                    id="minOrderAmount"
                    name="minOrderAmount"
                    label="Min Order Amount"
                    placeholder="Minimum amount to place order"
                    className={classes.textField}
                    onChange={handleInputChange}
                    value={inputs.minOrderAmount}
                    helperText={minOrderError}
                    error={minOrderError ? true : false}
                    type="number"
                    fullWidth
                    required
                  />
                  <Typography
                    variant="body2"
                    component="p"
                    style={{ margin: "10px 10px 2px 10px" }}
                  >
                    Address:
                  </Typography>
                  <div className={classes.address}>
                    <TextField
                      id="aptName"
                      name="aptName"
                      label="Floor/Apartment Name"
                      className={classes.textField}
                      onChange={handleInputChange}
                      value={inputs.aptName}
                      helperText={aptError}
                      error={aptError ? true : false}
                      fullWidth
                      required
                    />
                    <TextField
                      id="locality"
                      name="locality"
                      label="Locality"
                      className={classes.textField}
                      onChange={handleInputChange}
                      value={inputs.locality}
                      helperText={localityError}
                      error={localityError ? true : false}
                      fullWidth
                      required
                    />
                    <TextField
                      id="street"
                      name="street"
                      label="Street"
                      className={classes.textField}
                      onChange={handleInputChange}
                      value={inputs.street}
                      helperText={streetError}
                      error={streetError ? true : false}
                      fullWidth
                      required
                    />
                    <TextField
                      id="zipCode"
                      name="zip"
                      label="Zip Code"
                      className={classes.textField}
                      onChange={handleInputChange}
                      value={inputs.zip}
                      helperText={zipError}
                      error={zipError ? true : false}
                      type="number"
                      fullWidth
                      required
                    />
                    <TextField
                      id="phoneNo"
                      name="phoneNo"
                      label="Contact Number"
                      className={classes.textField}
                      type="number"
                      onChange={handleInputChange}
                      value={inputs.phoneNo}
                      helperText={phoneNoError}
                      error={phoneNoError ? true : false}
                      fullWidth
                      required
                    />
                  </div>
                  <TextField
                    id="payment"
                    name="payment"
                    label="Payment Mode"
                    placeholder="Cash, Online"
                    className={classes.textField}
                    onChange={handleInputChange}
                    value={inputs.payment}
                    helperText={paymentError}
                    error={paymentError ? true : false}
                    fullWidth
                    required
                  />
                  <Typography
                    variant="body2"
                    component="p"
                    style={{ margin: "10px 10px 2px 10px" }}
                  >
                    Upload Images:
                  </Typography>
                  <input
                    accept="image/*"
                    className={classes.uploadImages}
                    // style={{ display: "none" }}
                    id="raised-button-file"
                    multiple
                    type="file"
                    onChange={handleFileSelect}
                  />
                  {imageError && (
                    <Typography
                      variant="body2"
                      component="p"
                      style={{ margin: "4px 10px 2px 10px", color: "#f44336" }}
                    >
                      Upload an Image as well
                    </Typography>
                  )}
                  <TextField
                    id="password"
                    name="password"
                    type="password"
                    label="Password"
                    className={classes.textField}
                    onChange={handleInputChange}
                    value={inputs.password}
                    helperText={passwordError}
                    error={passwordError ? true : false}
                    fullWidth
                    required
                  />
                  <TextField
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    label="Confirm Password"
                    className={classes.textField}
                    onChange={handleInputChange}
                    value={inputs.confirmPassword}
                    helperText={
                      passwordError ? passwordError : confirmPasswordError
                    }
                    error={
                      passwordError ? true : confirmPasswordError ? true : false
                    }
                    fullWidth
                    required
                  />

                  {serverError && (
                    <Typography variant="body2" className={classes.customError}>
                      {"server error, please try again"}
                    </Typography>
                  )}

                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    className={classes.button}
                    fullWidth
                    disabled={loading}
                  >
                    Submit
                    {loading && (
                      <CircularProgress
                        size={30}
                        className={classes.progress}
                      />
                    )}
                  </Button>
                  <br />
                  <small
                    className={classes.small}
                    style={{ marginLeft: "260px" }}
                  >
                    Partner with FoodHub and scale your business
                  </small>
                </form>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
        <Grid item xs={3} style={{ marginLeft: "40px" }}>
          <Paper
            className={classes.paper}
            style={{ backgroundColor: "#e3e3e8" }}
            elevation={2}
          >
            <Typography
              gutterBottom
              variant="h5"
              noWrap
              style={{ textAlign: "center" }}
            >
              Get Started in just 3 steps
              <br />
              <br />
            </Typography>
            <Typography
              variant="body2"
              color="textPrimary"
              style={{ marginLeft: "30px", fontSize: "16px" }}
            >
              1. Tell us about your restaurant. <br />
              2. Verify your Email. <br />
              3. Access Restaurant Dashboard and go
              &nbsp;&nbsp;&nbsp;&nbsp;live.
              <br />
              <br />
              <br />
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={1} />
      </Grid>
    </div>
  );
}
