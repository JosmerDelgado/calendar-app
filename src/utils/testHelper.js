import React from "react";
import { createStore } from "redux";
import reducer from "../store/reducers";
import { Provider } from "react-redux";
import { render } from "@testing-library/react";

export function renderWithRedux(
  ui,
  { initialState, store = createStore(reducer, initialState) } = {}
) {
  return {
    ...render(<Provider store={store}>{ui}</Provider>),
    store
  };
}
