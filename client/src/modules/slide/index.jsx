import Box from "@mui/material/Box";
import MobileStepper from "@mui/material/MobileStepper";
import { useTheme } from "@mui/material/styles";
import giay5 from "assets/images/giay5.jpg";
import giay6 from "assets/images/giay6.jpg";
import slide1 from "assets/images/slide1.jpg";
import * as React from "react";
import SwipeableViews from "react-swipeable-views";
import { autoPlay } from "react-swipeable-views-utils";
import "./style.scss";

const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

const images = [
  {
    label: {
      text1: "30% OFF",
      text2: "Sneaker",
    },
    imgPath: slide1,
  },
  {
    label: {
      text1: "X2022",
      text2: "trendy",
    },
    imgPath: giay5,
  },
  {
    label: {
      text1: "New for",
      text2: "sport",
    },
    imgPath: giay6,
  },
];

function Slide() {
  const theme = useTheme();
  const [activeStep, setActiveStep] = React.useState(0);
  const maxSteps = images.length;

  const handleStepChange = (step) => {
    setActiveStep(step);
  };

  return (
    <div className="slider">
      <Box sx={{ flexGrow: 1 }}>
        <h1 className="title-slider">
          <span className="text">{images[activeStep].label["text1"]}</span>
          <b className="text text-2">{images[activeStep].label["text2"]}</b>
        </h1>
        <AutoPlaySwipeableViews
          axis={theme.direction === "rtl" ? "x-reverse" : "x"}
          index={activeStep}
          onChangeIndex={handleStepChange}
          enableMouseEvents
        >
          {images.map((step, index) => (
            <div key={index}>
              {Math.abs(activeStep - index) <= 2 ? (
                <Box
                  component="img"
                  sx={{
                    display: "block",
                    overflow: "hidden",
                    width: "100%",
                  }}
                  src={step.imgPath}
                  alt={step.label}
                />
              ) : null}
            </div>
          ))}
        </AutoPlaySwipeableViews>
        <MobileStepper
          steps={maxSteps}
          position="static"
          activeStep={activeStep}
        />
      </Box>
    </div>
  );
}

export default Slide;
