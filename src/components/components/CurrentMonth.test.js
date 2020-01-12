import React from "react";
import CurrentMonth from "./CurrentMonth";
import { renderWithRedux } from "../../utils/testHelper";
import moment from "moment";
import { fireEvent } from "@testing-library/react";
import testIds from "../../constants/testIds";

const currentMont = {
  date: "2014-03",
  name: moment("2014-03").format("MMMM YYYY"),
  days: moment("2014-03").daysInMonth()
};

const longText = "Text with more than 30 characters";
const shortText = "Short Text";

test("render CurrentMonth Component", () => {
  const { getByTestId } = renderWithRedux(
    <CurrentMonth currentMont={currentMont} />
  );

  const fabButton = getByTestId(testIds.fabButton(1));
  expect(fabButton).toBeInTheDocument();
  fireEvent.click(fabButton);
  const reminderModal = getByTestId(testIds.dialogTextField);
  expect(reminderModal).toBeInTheDocument();
  fireEvent.change(reminderModal, {
    target: { value: longText }
  });
  const confirmButton = getByTestId(testIds.confirmButton);
  expect(confirmButton).toBeInTheDocument();
  fireEvent.click(confirmButton);
  const errorLabel = getByTestId(testIds.textError);
  expect(errorLabel).toBeInTheDocument();
  fireEvent.change(reminderModal, {
    target: { value: shortText }
  });
  fireEvent.click(confirmButton);
  expect(reminderModal).not.toBeInTheDocument();
  const reminderRow = getByTestId(testIds.reminderRow);
  expect(reminderRow).toBeInTheDocument();
  expect(reminderRow.textContent).toBe(shortText);
});
