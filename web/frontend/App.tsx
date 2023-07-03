import CssBaseline from "@mui/material/CssBaseline";
import {BrowserRouter, Route, Routes,Link} from "react-router-dom";
import HomePage from "./pages";
import React, {useState} from "react";
import Products from "./pages/Products";
import Quotes from "./pages/Quotes";
import ResponsiveAppBar from "./components/MenuBarComponents/MenuBar";
import Setting from "./pages/Setting";
import GettingStarted from "./pages/GettingStarted";
import SaleOff from "./components/SaleOff";
import { AppBridgeProvider, PolarisProvider, QueryProvider } from "./components";
import NotFound from "./pages/NotFound";
import {createTheme, makeStyles, ThemeProvider} from "@mui/material/styles";

export interface IApplicationProps {
}

const App: React.FunctionComponent<IApplicationProps> = (props) => {
    const[path,setPath]=useState("")
    const getPath = (childData:string) => {
        setPath(childData)
        console.log("path",childData)
    }
    const theme = createTheme({

        typography: {
            fontFamily: [
                '-apple-system',
                'BlinkMacSystemFont',
                '"Segoe UI"',
                'Roboto',
                '"Helvetica Neue"',
                'Arial',
                'sans-serif',
                '"Apple Color Emoji"',
                '"Segoe UI Emoji"',
                '"Segoe UI Symbol"',
            ].join(','),
            body1:{
                fontWeight: "normal",
                fontSize: "0.9rem"
            },
            button: {
                textTransform: "none",
                fontFamily: 'sans-serif',
                fontStyle: 'normal',
                fontWeight: "bold",
                fontSize:"0.9rem"
            }
        },
        components: {
            MuiCssBaseline: {
                styleOverrides: {
                    "@font-face": {
                        fontFamily: "sans-serif",
                    },
                    button: {
                        textTransform: "none"
                    }
                }
            }
        }
    });


    return (
      <PolarisProvider>
        <BrowserRouter>
          <AppBridgeProvider>
            <QueryProvider>
                <ThemeProvider theme={theme}>
                <CssBaseline/>
              <ResponsiveAppBar parentCallback={getPath}/>
              {/*<SaleOff />*/}
              <Routes>
                  <Route path="/" element={<GettingStarted/>} />
                  <Route path="GettingStarted" element={<GettingStarted/>} />
                  <Route path="Quotes" element={<Quotes />} />
                  <Route path="Products" element={<Products />} />
                  <Route path="Setting" element={<Setting />} />
                  <Route path="*" element={<NotFound />} />
              </Routes>
                </ThemeProvider>
            </QueryProvider>
          </AppBridgeProvider>
        </BrowserRouter>
      </PolarisProvider>
    );
};
export default App