// import {
//     Card,
//     Page,
//     Layout,
//     TextContainer,
//     Image,
//     Stack,
//     Link,
//     Text,
//     LegacyCard
// } from "@shopify/polaris";
// import { TitleBar } from "@shopify/app-bridge-react";
// import { useTranslation, Trans } from "react-i18next";

// import { trophyImage } from "../assets/index.js";
//
// import { ProductsCard } from "../components";
// import {
//   createBrowserRouter,
//   createRoutesFromElements,
//   Route,
//   RouterProvider,
//     useNavigate,
// } from "react-router-dom";
import React, {useCallback, useState} from "react";
// import { Tabs, Tab, AppBar } from "@material-ui/core"
// import Tabs from '@mui/material/Tabs'
// import Tab from '@mui/material/Tab'
// import AppBar from '@mui/material/AppBar'
// import Products from "./product";
// import GettingStarted from "./GettingStarted";
// import Quotes from "./Quotes";
import { Link, useNavigate } from 'react-router-dom';
import {AppBar, Tab, Tabs} from "@mui/material";
import GettingStarted from "./GettingStarted";

export interface IHomePageProps {}

const HomePage: React.FunctionComponent<IHomePageProps> = (props) => {
    return (
        <div>
            <p> This is the home Page</p>
            <Link to="/Quotes" >Quotes </Link>
            <br/>
            <Link to="/Products" >Products </Link>
            <br/>
            <Link to="/Setting" >Setting </Link>
            <br/>
            <Link to="/GettingStarted" >Getting Started </Link>
        </div>
    )
}
export default HomePage

