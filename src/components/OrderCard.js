import React from "react";
import { useDispatch } from "react-redux";

//m-ui
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import FiberManualRecordIcon from "@material-ui/icons/FiberManualRecord";
import makeStyles from "@material-ui/core/styles/makeStyles";

import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

import SummaryExpansion from "./FilterExpansion";
import { changeOrderStatus } from "../redux/actions/dataActions";

const useStyles = makeStyles((theme) => ({
  ...theme.spreadThis,
  para: {
    fontSize: "x-large",
    marginLeft: "32%",
  },
  title: {
    margin: "20px 0px 10px 260px",
    display: "inline-block",
    marginRight: "40%",
  },
  spaceTypo: {
    display: "flex",
    justifyContent: "space-between",
  },
  address: {
    "& > *": {
      margin: theme.spacing(4),
      width: "25ch",
    },
  },
  red: {
    color: "red",
  },
  green: {
    color: "green",
  },
  buttonCancel: {
    backgroundColor: "#cf0700",
    color: "white",
    marginBottom: 20,
    marginTop: 10,
    marginRight: 10,
    "&:hover": {
      backgroundColor: "#5a5c5a",
    },
    "&:disabled": {
      backgroundColor: "#5a5c5a",
      color: "white",
    },
  },
  buttonAccept: {
    backgroundColor: "#118a27",
    color: "white",
    marginBottom: 20,
    marginTop: 10,
    "&:hover": {
      backgroundColor: "#5a5c5a",
    },
  },
}));

const OrderCard = (props) => {
  const order = props.order;
  const role = props.role;
  const classes = useStyles();
  dayjs.extend(relativeTime);
  const dispatch = useDispatch();

  const handleCancel = () => {
    const body = {
      status: "Cancelled",
    };
    dispatch(changeOrderStatus(order._id, body));
  };

  const handleAccept = () => {
    const body = {
      status: "Accepted",
    };
    dispatch(changeOrderStatus(order._id, body));
  };

  const handleDelivery = () => {
    const body = {
      status: "Out For Delivery",
    };
    dispatch(changeOrderStatus(order._id, body));
  };

  const handleCompleted = () => {
    const body = {
      status: "Completed",
    };
    dispatch(changeOrderStatus(order._id, body));
  };

  return (
    <Paper
      style={{
        backgroundColor: "#faf7f7",
        marginRight: 20,
        marginBottom: 20,
      }}
      elevation={4}
    >
      <div style={{ marginLeft: 20 }}>
        <Typography gutterBottom variant="body1" color="textSecondary">
          OrderId - #{order._id}
        </Typography>
        <Typography gutterBottom variant="body1" color="textPrimary">
          {role === "ROLE_USER" && `Ordered From - ${order.seller.name}`}
          {role === "ROLE_SELLER" &&
            `Ordered By - ${order.user.name}, +91 ${order.user.address.phoneNo}`}
        </Typography>
        {role === "ROLE_USER" && (
          <Typography gutterBottom variant="body1" color="textPrimary">
            Call - +91 {order.seller.phone}
          </Typography>
        )}

        {role === "ROLE_SELLER" && (
          <Typography gutterBottom variant="body1" color="textPrimary">
            Address -{" "}
            {
              order.user.address.aptName + ", " + order.user.address.locality
              // (`${order.user.address.aptName}, ${order.user.address.locality}`,
              // `${order.user.address.street}`)
            }
          </Typography>
        )}
        <div style={{ margin: "10px 20px 10px 0px" }}>
          <SummaryExpansion condition="Orders" items={order.items} />
        </div>
        <Typography gutterBottom variant="body1" color="textPrimary">
          Ordered - {dayjs(order.createdAt).fromNow()}
        </Typography>
        <div style={{ display: "flex", flexDirection: "row" }}>
          <FiberManualRecordIcon
            disabled
            className={
              order.status === "Cancelled" ? classes.red : classes.green
            }
          />
          <Typography gutterBottom variant="body1" color="textPrimary">
            Order {order.status}
          </Typography>
        </div>
        {role === "ROLE_USER" && order.status === "Placed" && (
          <Button
            className={classes.buttonCancel}
            onClick={handleCancel}
            disabled={order.status !== "Placed"}
          >
            Cancel Order
          </Button>
        )}
        {role === "ROLE_SELLER" && order.status === "Placed" && (
          <>
            <div style={{ display: "inline-block" }}>
              <Button className={classes.buttonCancel} onClick={handleCancel}>
                Cancel Order
              </Button>
              <Button className={classes.buttonAccept} onClick={handleAccept}>
                Accept Order
              </Button>
            </div>
          </>
        )}
        {role === "ROLE_SELLER" && order.status === "Accepted" && (
          <Button className={classes.buttonAccept} onClick={handleDelivery}>
            Out For Delivery
          </Button>
        )}
        {role === "ROLE_SELLER" && order.status === "Out For Delivery" && (
          <Button className={classes.buttonAccept} onClick={handleCompleted}>
            Order Completed
          </Button>
        )}
        <br />
      </div>
    </Paper>
  );
};

export default OrderCard;
