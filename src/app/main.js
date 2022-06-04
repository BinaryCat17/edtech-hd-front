import React from "react"
import Router from "./router"
import PageTemplate from "modules/decoration/PageTemplate"
import { Provider } from "react-redux"
import { BrowserRouter } from "react-router-dom";
import store from "./store"
import "@progress/kendo-theme-material/dist/all.css";
import "hammerjs";

export default function Main() {

    return (
        <Provider store={store}>
            <BrowserRouter>
                <PageTemplate>
                    <Router className="border"/>
                </PageTemplate>
            </BrowserRouter>
        </Provider>
    );
}