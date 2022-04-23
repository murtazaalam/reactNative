import {
  createStore,
  compose,
  applyMiddleware
} from "redux";
import thunk from "redux-thunk";
import reducers from "../redux";

const middlewares = [thunk];

 let store = createStore(reducers, {}, compose(applyMiddleware(...middlewares)));

export default store;
