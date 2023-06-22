import App from "./App";
import React from "react";
import ReactDOM from "react-dom"
import {CssBaseline} from "@mui/material";

const rootElement = document.getElementById("app")
ReactDOM.render(
    <React.StrictMode>
        <CssBaseline />
            <App />
    </React.StrictMode>,
    rootElement
)