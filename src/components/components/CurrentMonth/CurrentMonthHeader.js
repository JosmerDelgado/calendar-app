import React from "react";
import { TableHead, TableRow, TableCell } from "@material-ui/core";
import moment from "moment";

const CurrentMonthHeader = () => {
  const weekdays = moment.weekdays();
  return (
    <TableHead>
      <TableRow>
        {weekdays.map(day => (
          <TableCell key={day}>{day}</TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
};

export default CurrentMonthHeader;
