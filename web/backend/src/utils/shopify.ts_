import {BillingInterval, LATEST_API_VERSION} from "@shopify/shopify-api";
import { shopifyApp } from "@shopify/shopify-app-express";
import { SQLiteSessionStorage } from "@shopify/shopify-app-session-storage-sqlite";
import { restResources } from "@shopify/shopify-api/rest/admin/2023-04";
// import {MySQLSessionStorage} from "@shopify/shopify-app-session-storage-mysql";
import {join} from "path";
import sqlite3 from "sqlite3";
// import mysql from "mysql2/index";
// let { restResources } = await import(
//     `@shopify/shopify-api/rest/admin/${LATEST_API_VERSION}`
//     )
// const restResources = async ()=>{
//     console.log(LATEST_API_VERSION)
//     await import(
//         `@shopify/shopify-api/rest/admin/${LATEST_API_VERSION}`
//         )}

console.log("Latest API Version",LATEST_API_VERSION)

const DB_PATH = `${process.cwd()}/database.sqlite`;
const PATH = "/Users/Brucenguyen/vify-app-nestjs-17-jun/web/database.sql"
console.log("DB_PATH",DB_PATH)
// The transactions with Shopify will always be marked as test transactions, unless NODE_ENV is production.
// See the ensureBilling helper to learn more about billing in this template.
// const billingConfig = {
//     "My Shopify One-Time Charge": {
//         // This is an example configuration that would do a one-time charge for $5 (only USD is currently supported)
//         amount: 5.0,
//         currencyCode: "USD",
//         interval: BillingInterval.OneTime,
//     },
// };
// let database = new sqlite3.Database(PATH)



// console.log("database",database)
const sessionDb = new SQLiteSessionStorage(DB_PATH);
// console.log("sessionDB",sessionDb)
// // Initialize SQLite DB
// InvoicesDb.db = database;
// InvoicesDb.init().then(r => console.log("Invoice Database connected"));
//
// const connection =  mysql.createConnection("jdbc:mysql://localhost:3309/vify_database");
// connection.connect(function(err) {
//     if (err) {
//         return console.error('error: ' + err.message);
//     }
//
//     console.log('Connected to the MySQL server.');
// });
// const { Session } = require("@shopify/shopify-api/dist/auth/session");
// const sessionDB = new MySQLSessionStorage(Session)


const shopify = shopifyApp({
    api: {
        apiVersion: LATEST_API_VERSION,
        restResources,
        billing: undefined, // or replace with billingConfig above to enable example billing
    },
    auth: {
        path: "/api/auth",
        callbackPath: "/api/auth/callback",
    },
    webhooks: {
        path: "/api/webhooks",
    },
    sessionStorage: sessionDb

});

export default shopify;
