import { createStore } from "redux";
import rooterReducer from "./reducers";
import { composeWithDevTools } from "redux-devtools-extension";

export default function configureStore(initialState) {
  return createStore(rooterReducer, initialState, composeWithDevTools());
}
