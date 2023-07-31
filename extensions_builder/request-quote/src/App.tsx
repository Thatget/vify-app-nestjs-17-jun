import React from 'react'
// import ReactDOM from 'react-dom/client'
// import App from './App.tsx'
// import '../assets/index.css'
// import {ThemeProvider} from "@material-tailwind/react";

// import "../../../extensions/request-quote/assets/index.css"
import "./index.css"
// import {AppBridgeProvider, PolarisProvider, QueryProvider} from "../../../web/frontend/components";
// import ContextProvider from "../../../web/frontend/store/ContextProvider.tsx";
import Index from "./index.tsx";

const App = () => {
    return (
        <React.StrictMode>
            {/*<PolarisProvider>*/}
            {/*    <AppBridgeProvider>*/}
            {/*        <QueryProvider>*/}
            {/*            <ContextProvider>*/}
            <Index/>
            {/*            </ContextProvider>*/}
            {/*        </QueryProvider>*/}
            {/*    </AppBridgeProvider>*/}
            {/*</PolarisProvider>*/}
        </React.StrictMode>
    )
}
export default App
