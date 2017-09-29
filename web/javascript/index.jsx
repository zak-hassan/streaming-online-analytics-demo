import { render } from "react-dom";
import React from "react";
import { Provider } from "react-redux";

import AppWrapper from "./AppWrapper.jsx";
import store from "./store";

render (
    <Provider store={store}>
        <AppWrapper />
    </Provider>, document.getElementById('root')
);
