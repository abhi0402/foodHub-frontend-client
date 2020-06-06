import React from "react";
import { useDispatch } from "react-redux";

//m-ui
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";

// Icons
import RemoveIcon from "@material-ui/icons/Remove";
import DeleteIcon from "@material-ui/icons/Delete";
import AddIcon from "@material-ui/icons/Add";

import {
  addToCart,
  deleteCartItem,
  removeCartItem,
} from "../redux/actions/dataActions";
import MyButton from "../util/MyButton";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  details: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
  },
  buttons: {
    display: "flex",
    flexDirection: "row",
    marginTop: "10px",
  },
  itemTotal: {
    marginLeft: "62%",
    marginTop: "10px",
  },
  imgCover: { height: 184, width: 270 },
}));

export default function CartItem(props) {
  const classes = useStyles();
  const {
    quantity,
    itemId: { title, price, description, imageUrl, _id },
  } = props;
  const imageUrlSplit = imageUrl.split("\\");
  const finalImageUrl = `${process.env.REACT_APP_SERVER_URL}/${imageUrlSplit[0]}/${imageUrlSplit[1]}`;

  const dispatch = useDispatch();

  const handleAddItem = () => {
    const itemData = {
      itemId: _id,
    };
    dispatch(addToCart(itemData));
  };

  const handleDeleteItem = () => {
    const itemData = {
      itemId: _id,
    };
    dispatch(deleteCartItem(itemData));
  };

  const handleRemoveItem = () => {
    dispatch(removeCartItem(_id));
  };

  return (
    <>
      <Card className={classes.root} variant="outlined">
        <div className={classes.imgCover}>
          <img src={finalImageUrl} height="184" width="180" alt="Item" />
        </div>

        <div className={classes.details}>
          <CardContent>
            <Typography component="h5" variant="h5">
              {title}
            </Typography>
            <Typography variant="subtitle1" color="textSecondary" noWrap>
              {description}
            </Typography>
            <Typography variant="subtitle1" color="textSecondary">
              Rs.{price} x {quantity}
            </Typography>

            <div className={classes.buttons}>
              <MyButton tip="Remove Item" onClick={handleRemoveItem}>
                <RemoveIcon style={{ color: "#f44336" }} />
              </MyButton>
              <MyButton tip="Add Item" onClick={handleAddItem}>
                <AddIcon style={{ color: "green" }} />
              </MyButton>
              <MyButton tip="Delete Item" onClick={handleDeleteItem}>
                <DeleteIcon style={{ color: "#f44336" }} />
              </MyButton>
              <Typography
                variant="body1"
                color="textPrimary"
                className={classes.itemTotal}
              >
                Rs. {price * quantity}
              </Typography>
            </div>
          </CardContent>
        </div>
      </Card>
      <br />
    </>
  );
}
