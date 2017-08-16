import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from 'redux-thunk';

import messageReducer from "./message/messageReducer";
import modalReducer from "./modal/modalReducer";

export default createStore(
  combineReducers({
    modalReducer,
    messageReducer,}),
    applyMiddleware(thunk)
);

