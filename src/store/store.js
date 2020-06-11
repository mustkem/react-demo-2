import { createStore, applyMiddleware, compose } from "redux";
import rootReducer from "./reducers/rootReducers";
import thunk from "redux-thunk";

const composeEnhancers =
  (typeof window !== "undefined" &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
  compose;

export const appStore = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk))
);
