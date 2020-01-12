import React, { useState } from "react";
import { Button, Typography } from "@material-ui/core";
import { GithubPicker } from "react-color";
import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles({
  gridColor: {
    backgroundColor: props => props.color,
    height: 30,
    width: 30,
    marginTop: 4,
    "&:hover": {
      backgroundColor: props => props.color
    }
  }
});

const ColorPicker = ({ color, setColor }) => {
  const classes = useStyles({ color });
  const [showPicker, setShowPicker] = useState(false);
  return (
    <>
      <Typography>Select Color</Typography>
      <Button
        onClick={() => {
          setShowPicker(true);
        }}
        className={classes.gridColor}
      />
      {showPicker && (
        <GithubPicker
          className={classes.colorPicker}
          onChange={color => {
            setColor(color.hex);
            setShowPicker(false);
          }}
        />
      )}
    </>
  );
};

export default ColorPicker;
