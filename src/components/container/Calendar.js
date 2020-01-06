import React, { useState, useCallback } from "react";
import CurrentMonth from "../components/CurrentMonth";
import { makeStyles } from "@material-ui/styles";
import { Paper } from "@material-ui/core";
import moment from "moment";
import CalendarHeader from "../components/CalendarHeader";
import { commonInputHandleChange as handleChange } from "../../utils/reactHelper";
import { countryList } from "../../constants/common";

const useStyles = makeStyles({
  root: {
    width: "100%",
    overflowX: "auto"
  }
});

const Calendar = () => {
  const classes = useStyles();
  const curMonth = moment().format("YYYY-MM");
  const currentMont = {
    date: curMonth,
    name: moment(curMonth).format("MMMM YYYY"),
    days: moment(curMonth).daysInMonth()
  };
  const [selectedCountry, setSelectedCountry] = useState(countryList[0].value);
  const handleChangeCountry = useCallback(handleChange(setSelectedCountry));

  return (
    <Paper className={classes.root}>
      <CalendarHeader
        currentMonth={currentMont.name}
        selectedCountry={selectedCountry}
        handleChangeCountry={handleChangeCountry}
      />
      <CurrentMonth country={selectedCountry} currentMont={currentMont} />
    </Paper>
  );
};

export default Calendar;
