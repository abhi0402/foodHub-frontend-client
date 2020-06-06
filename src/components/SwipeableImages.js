import React from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import KeyboardArrowLeft from "@material-ui/icons/KeyboardArrowLeft";
import KeyboardArrowRight from "@material-ui/icons/KeyboardArrowRight";
import SwipeableViews from "react-swipeable-views";
// import { autoPlay } from "react-swipeable-views-utils";

// const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

const useStyles = makeStyles((theme) => ({
  img: {
    height: 240,
    display: "block",
    maxWidth: 400,
    overflow: "hidden",
    width: "100%",
  },
  imgRest: {
    height: 360,
    display: "block",
    maxWidth: 500,
    overflow: "hidden",
    width: "100%",
    borderRadius: "5%",
  },
  buttonLeft: {
    position: "relative",
    top: "-132px",
    left: "-4%",
    color: "white",
  },
  buttonRight: {
    position: "relative",
    top: "-132px",
    right: "-62%",
    color: "white",
  },
  buttonRightRest: {
    right: "-72.5%",
  },
}));

function SwipeableImages(props) {
  const classes = useStyles();
  const theme = useTheme();
  const [activeStep, setActiveStep] = React.useState(0);
  const imagesArray = props.images;
  let newImagesArray;
  let maxSteps;
  newImagesArray = imagesArray.map((image) => {
    const imageUrlSplit = image.split("\\");
    const imageUrl = imageUrlSplit[0] + "/" + imageUrlSplit[1];
    return `${process.env.REACT_APP_SERVER_URL}/${imageUrl}`;
  });
  maxSteps = newImagesArray.length;

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleStepChange = (step) => {
    setActiveStep(step);
  };

  return (
    <>
      <div>
        <SwipeableViews
          axis={theme.direction === "rtl" ? "x-reverse" : "x"}
          index={activeStep}
          onChangeIndex={handleStepChange}
          enableMouseEvents
        >
          {newImagesArray.map((step, index) => (
            <div key={step}>
              {Math.abs(activeStep - index) <= 2 ? (
                <img
                  className={
                    props.type === "home" ? classes.img : classes.imgRest
                  }
                  src={step}
                  alt={step}
                />
              ) : null}
            </div>
          ))}
        </SwipeableViews>
      </div>
      <Button
        size="small"
        className={props.type === "home" ? classes.buttonLeft : null}
        onClick={handleBack}
        disabled={activeStep === 0}
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowRight />
        ) : (
          <KeyboardArrowLeft />
        )}
      </Button>
      <Button
        className={
          props.type === "home" ? classes.buttonRight : classes.buttonRightRest
        }
        size="small"
        onClick={handleNext}
        disabled={activeStep === maxSteps - 1}
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowLeft />
        ) : (
          <KeyboardArrowRight />
        )}
      </Button>
    </>
  );
}

export default SwipeableImages;
