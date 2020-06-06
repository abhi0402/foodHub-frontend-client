import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import Typography from "@material-ui/core/Typography";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";

//custom-hook
import useForm from "../hooks/forms";

import ItemDialog from "../components/ItemDialog";
import RestaurantInfo from "../components/RestaurantInfo";
import RestaurantItems from "../components/RestaurantItems";
import SearchBar from "../components/SearchBar";
import { addItem } from "../redux/actions/dataActions";

const useStyles = makeStyles((theme) => ({
  ...theme.spreadThis,
  button: {
    backgroundColor: theme.palette.primary.main,
    color: "white",
    width: "40%",
    margin: "40px 0 0 30%",
    "&:hover": {
      backgroundColor: "#5a5c5a",
    },
  },
}));

export default function SellerDashboard() {
  const classes = useStyles();
  const sellerData = useSelector((state) => state.auth);
  const { items } = sellerData;
  const dispatch = useDispatch();

  useEffect(() => {
    if (items) {
      setItemsState(items);
      setFilteredItemsState(items);
    }
  }, [items]);

  const [itemsState, setItemsState] = useState(items ? [] : null);
  const [filteredItemsState, setFilteredItemsState] = useState(
    items ? [] : null
  );
  const [open, setOpen] = useState(false);
  const [image, setImage] = useState({});
  const { inputs, handleInputChange } = useForm({
    title: "",
    description: "",
    price: "",
  });

  const handleFileSelect = (event) => {
    setImage(event.target.files[0]);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    inputs.title = "";
    inputs.description = "";
    inputs.price = "";
    setImage(null);
    setOpen(false);
  };

  const handleSubmit = () => {
    const itemData = new FormData();
    itemData.append("image", image);
    itemData.append("title", inputs.title);
    itemData.append("description", inputs.description);
    itemData.append("price", inputs.price);
    dispatch(addItem(itemData)); // eslint-disable-next-line
    handleClose();
  };

  const handleSearch = (value) => {
    // Variable to hold the original version of the list
    let currentList = [];
    // Variable to hold the filtered list before putting into state
    let newList = [];

    // If the search bar isn't empty
    if (value !== "") {
      // Assign the original list to currentList
      currentList = itemsState;

      newList = currentList.filter((item) => {
        const lc = item.title.toLowerCase();
        const filter = value.toLowerCase();
        return lc.includes(filter);
      });
    } else {
      // If the search bar is empty, set newList to original task list
      newList = itemsState;
    }
    // Set the filtered state based on what our rules added to newList
    setFilteredItemsState(newList);
  };

  return (
    <>
      <RestaurantInfo {...sellerData} />
      <Grid container direction="row" style={{ marginTop: 40 }}>
        <Grid item xs={12} sm={1} />
        <Grid item xs={12} sm={6}>
          <Typography
            gutterBottom
            variant="h5"
            style={{ textAlign: "center", marginBottom: 30 }}
            noWrap
          >
            Add, Edit, Delete Items in your Restaurant&nbsp;&nbsp;
            <span role="img" aria-label="burger" style={{ fontSize: 40 }}>
              🍜
            </span>
          </Typography>
        </Grid>
        <Grid item xs={12} sm={4}>
          <SearchBar page="items" handleSearch={handleSearch} />
        </Grid>
        <Grid item xs={12} sm={1} />
        <RestaurantItems items={filteredItemsState} />
      </Grid>
      <Button fullWidth className={classes.button} onClick={handleOpen}>
        Add Item
      </Button>
      <ItemDialog
        open={open}
        handleClose={handleClose}
        handleSubmit={handleSubmit}
        handleFileSelect={handleFileSelect}
        inputs={inputs}
        handleInputChange={handleInputChange}
      />
    </>
  );
}
