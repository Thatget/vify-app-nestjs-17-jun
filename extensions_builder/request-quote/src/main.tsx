import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
// import '../assets/index.css'
import {ThemeProvider} from "@material-tailwind/react";

// import "../../../extensions/request-quote/assets/index.css"
import "./index.css"
// import {AppBridgeProvider, PolarisProvider, QueryProvider} from "../../../web/frontend/components/providers";

ReactDOM.createRoot(document.getElementById('vify_rfq-f')!).render(
    <React.StrictMode>
        {/*<PolarisProvider>*/}
        {/*    <AppBridgeProvider>*/}
        {/*        <QueryProvider>*/}
        <App/>
        {/*</QueryProvider>*/}
        {/*//         </AppBridgeProvider>*/}
        {/*//     </PolarisProvider>*/}
        // </React.StrictMode>

    ,
)
