import {ThemeProvider} from "@material-tailwind/react";
import App from "./App";
import React from "react";
// import ReactDOM from "react-dom"
import ReactDOM from "react-dom";
// import {CssBaseline} from "@mui/material";
import "./css/style.css";

const rootElement = document.getElementById("app")
ReactDOM.render(
    <>
        {/*<CssBaseline />*/}
        {/*<ThemeProvider>*/}
        <App/>
        {/*</ThemeProvider>*/}
    </>,
    rootElement
)
// const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
// root.render(
//     <React.StrictMode>
//         <ThemeProvider>
//             <App/>
//         </ThemeProvider>
//     </React.StrictMode>,
// );