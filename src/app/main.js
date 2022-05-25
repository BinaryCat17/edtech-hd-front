import React from "react"
import Router from "./router"
import Template from "modules/decoration/Template"
import { Provider } from "react-redux"
import { BrowserRouter } from "react-router-dom";
import store from "./store"

export default function Main() {

    return (
        <Provider store={store}>
            <BrowserRouter>
                <Template>
                    <Router className="border"/>
                </Template>
            </BrowserRouter>
        </Provider>
    );
}