import React from "react";
import { Link } from "react-router-dom";

//M-UI
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

import SwipeableImages from "./SwipeableImages";

const useStyles = makeStyles({
  cardContent: {
    marginTop: "-40px",
  },
});

export default function RestaurantCard(props) {
  const {
    name,
    tags,
    costForOne,
    minOrderAmount,
    payment,
    imageUrl,
    _id,
  } = props;

  let restUrl = name.split(" ");
  restUrl = restUrl.join("-").toLowerCase();
  const classes = useStyles();
  let paymentString;

  if (payment.length === 1)
    paymentString = `Accepts ${payment[0].toLowerCase()} payment`;

  if (payment.length === 2)
    paymentString = `Accepts ${payment[0].toLowerCase()} & ${payment[1].toLowerCase()} payments`;

  return (
    <Card variant="outlined">
      <SwipeableImages images={imageUrl} type="home" />
      <CardContent className={classes.cardContent}>
        <Typography gutterBottom variant="h5" component="h2">
          {name}
        </Typography>
        <Typography variant="body2" color="textSecondary" component="p" noWrap>
          {tags}
        </Typography>
        <Typography variant="body2" color="textSecondary" component="p">
          Costs Rs.{costForOne} for one
        </Typography>
        <Typography variant="body2" color="textPrimary">
          Minimum order Rs.{minOrderAmount}
        </Typography>
        <Typography variant="body2" color="textPrimary">
          {paymentString}
        </Typography>
      </CardContent>
      <hr />
      <CardActions>
        <Link
          to={{
            pathname: `order/${restUrl}`,
            state: {
              restId: _id,
            },
          }}
        >
          <Button size="small" color="primary">
            Order Online
          </Button>
        </Link>
      </CardActions>
    </Card>
  );
}
