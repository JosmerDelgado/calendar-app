import React from "react";
import { Grid, Typography, Select, InputLabel } from "@material-ui/core";
import { countryList } from "../../constants/common";

const CalendarHeader = ({
  currentMonth,
  selectedCountry,
  handleChangeCountry
}) => {
  return (
    <Grid container>
      <Grid item xs={12}>
        <Typography variant="caption">Calendar-App</Typography>
      </Grid>
      <Grid item xs={10}>
        <Typography variant="h3" align="center">
          {currentMonth}
        </Typography>
      </Grid>
      <Grid item xs={2}>
        <InputLabel> Country</InputLabel>
        <Select value={selectedCountry} onChange={handleChangeCountry}>
          {countryList.map(country => (
            <option key={country.value} value={country.value}>
              {country.name}
            </option>
          ))}
        </Select>
      </Grid>
    </Grid>
  );
};

export default CalendarHeader;
