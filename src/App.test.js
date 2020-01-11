import React from "react";
import { render } from "@testing-library/react";
import App from "./App";
import { createStore } from "redux";
import reducer from "./store/reducers";
import { Provider } from "react-redux";

function renderWithRedux(
  ui,
  { initialState, store = createStore(reducer, initialState) } = {}
) {
  return {
    ...render(<Provider store={store}>{ui}</Provider>),
    // adding `store` to the returned utilities to allow us
    // to reference it in our tests (just try to avoid using
    // this to test implementation details).
    store
  };
}

test("renders learn react link", () => {
  const { getByText } = renderWithRedux(<App />);
  const linkElement = getByText(/Calendar-App/i);
  expect(linkElement).toBeInTheDocument();
});
