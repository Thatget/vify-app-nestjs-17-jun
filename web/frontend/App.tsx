import {BrowserRouter, Route, Routes,Link} from "react-router-dom";
import HomePage from "./pages";
import React, {useState} from "react";
import Products from "./pages/Products";
import Quotes from "./pages/Quotes";
import ResponsiveAppBar from "./components/MenuBar";
import Setting from "./pages/Setting";
import GettingStarted from "./pages/GettingStarted";
import SaleOff from "./components/SaleOff";
import { AppBridgeProvider, PolarisProvider, QueryProvider } from "./components";
import NotFound from "./pages/NotFound";

export interface IApplicationProps {
}

const App: React.FunctionComponent<IApplicationProps> = (props) => {
    const[path,setPath]=useState("")
    const getPath = (childData:string) => {
        setPath(childData)
        console.log("path",childData)
    }

    return (
      <PolarisProvider>
        <BrowserRouter>
          <AppBridgeProvider>
            <QueryProvider>
              <ResponsiveAppBar parentCallback={getPath}/>
              <SaleOff />
              <Routes>
                  <Route path="/" element={<GettingStarted/>} />
                  <Route path="GettingStarted" element={<GettingStarted/>} />
                  <Route path="Quotes" element={<Quotes />} />
                  <Route path="Products" element={<Products />} />
                  <Route path="Setting" element={<Setting />} />
                  <Route path="*" element={<NotFound />} />
              </Routes>
            </QueryProvider>
          </AppBridgeProvider>
        </BrowserRouter>
      </PolarisProvider>
    );
};
export default App