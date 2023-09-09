import { AppProvider } from "@shopify/polaris";
import App from "./App";
import React from "react";
import ReactDOM from "react-dom";
import translations from '@shopify/polaris/locales/en.json'
// import { useI18n} from '@shopify/react-i18n'
// import "./css/polaris.css";
// import '@shopify/polaris/build/esm/styles.css'
import './css/styles.css'
// import '@shopify/polaris/styles.css'


const rootElement = document.getElementById("vify_rfq-f")
ReactDOM.render(
    <>
    <AppProvider i18n={translations}>
            <App/>
            </AppProvider>
    </>,
    rootElement
)