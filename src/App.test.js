import React from "react";
import App from "./App";
import { renderWithRedux } from "./utils/testHelper";

test("renders learn react link", () => {
  const { getByText } = renderWithRedux(<App />);
  const linkElement = getByText(/Calendar-App/i);
  expect(linkElement).toBeInTheDocument();
});
