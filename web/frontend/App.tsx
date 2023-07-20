// import CssBaseline from "@mui/material/CssBaseline";
import {BrowserRouter, Route, Routes, Link} from "react-router-dom";
import HomePage from "./pages";
import React, {useState} from "react";
import Products from "./pages/Products";
import Quotes from "./pages/Quotes";
import ResponsiveAppBar from "./components/MenuBarComponents/MenuBar";
import Setting from "./pages/Setting";
import GettingStarted from "./pages/GettingStarted";
import SaleOff from "./components/SaleOff";
import {AppBridgeProvider, PolarisProvider, QueryProvider} from "./components";
import NotFound from "./pages/NotFound";
import ContextProvider from "./store/ContextProvider";
import {createTheme, makeStyles} from "@mui/material/styles";

import {PaletteColor, PaletteColorOptions} from "@mui/material";
import {blue, brown, cyan, deepPurple, green, grey, lightBlue, orange, purple} from "@mui/material/colors";
import TabsTesting from "./pages/TabsTesting";

// declare module '@mui/material/styles' {
//     interface Palette {
//         hideShowColor: PaletteColorOptions
//     }
//     interface PaletteColorOptions {
//         hideShowColor: PaletteColorOptions
//     }
// }

export interface IApplicationProps {
}

const App: React.FunctionComponent<IApplicationProps> = (props) => {
    const [path, setPath] = useState("")
    const getPath = (childData: string) => {
        setPath(childData)
    }
    // const { palette } = createTheme()
    // const { augmentColor } = palette
    // const createColor = (mainColor:any) => augmentColor({ color:{ main: mainColor}})

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
            body1: {
                fontWeight: "normal",
                fontSize: "0.9rem"
            },
            body2: {
                fontSize: "0.9rem",
                fontWeight: "bold"
            },
            button: {
                textTransform: "none",
                fontFamily: 'sans-serif',
                fontStyle: 'normal',
                fontWeight: "bold",
                fontSize: "0.9rem"
            }
        },
        palette: {
            secondary: {
                light: grey[300],
                main: blue[300],
                contrastText: blue[300]
            }
        },
        components: {
            MuiListItemButton: {
                defaultProps: {
                    disableTouchRipple: true,
                },
            },
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
                        {/*<ThemeProvider>*/}
                        {/*<CssBaseline/>*/}
                        <ContextProvider>
                            <ResponsiveAppBar parentCallback={getPath}/>
                            {/*<SaleOff/>*/}
                            <Routes>
                                <Route path="/" element={<GettingStarted/>}/>
                                <Route path="GettingStarted" element={<GettingStarted/>}/>
                                <Route path="Quotes" element={<Quotes/>}/>
                                <Route path="Products" element={<Products/>}/>
                                <Route path="Setting" element={<Setting/>}/>
                                <Route path="*" element={<NotFound/>}/>
                            </Routes>
                        </ContextProvider>
                        {/*</ThemeProvider>*/}
                    </QueryProvider>
                </AppBridgeProvider>
            </BrowserRouter>
        </PolarisProvider>
    );
};
export default App