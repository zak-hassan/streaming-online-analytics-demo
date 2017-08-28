import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from 'redux-thunk';

import messageReducer from "./message/messageReducer";
import modalReducer from "./modal/modalReducer";
import productReducer from "./productView/productReducer";
import orderReducer from  "./orderView/orderReudcer";
import orderQueryReducer from "./orderQueryView/orderQueryReducer";

export default createStore(
  combineReducers({
    productReducer,
    modalReducer,
    messageReducer,
    orderReducer,
    orderQueryReducer,
  }),
    applyMiddleware(thunk)
);

