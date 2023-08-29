import { AppProvider } from "@shopify/polaris";
import App from "./App";
import React from "react";
import ReactDOM from "react-dom";
import translations from '@shopify/polaris/locales/en.json'
// import { useI18n} from '@shopify/react-i18n'
// import "./css/style.css";
import '@shopify/polaris/build/esm/styles.css'

const rootElement = document.getElementById("vify_rfq-f")
// const [i18n] = useI18n({
//   id:'Polaris',
//   fallback: translations,
//   translations(locate) {
//     return import (
//       `@shopify/polaris/locates/${locate}.json`
//     ).then((dictionary) => dictionary && dictionary.default)
//   },
// })

ReactDOM.render(
    <>
    <AppProvider i18n={translations}>
            <App/>
            </AppProvider>
    </>,
    rootElement
)