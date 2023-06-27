import { BillingInterval, LATEST_API_VERSION } from "@shopify/shopify-api";
import { shopifyApp } from "@shopify/shopify-app-express";
import { SQLiteSessionStorage } from "@shopify/shopify-app-session-storage-sqlite";
import {MySQLSessionStorage} from '@shopify/shopify-app-session-storage-mysql';
// const { restResources } = await import(
//     `@shopify/shopify-api/rest/admin/${LATEST_API_VERSION}`
//     );
const restResources = async () => {
    await import(
        `@shopify/shopify-api/rest/admin/${LATEST_API_VERSION}`
        )
};

// New codes from me
// import sqlite3 from "sqlite3";
import mysql from "mysql2";

import {join} from "path";
// import {OrdersDB} from "./backend/database/Orders_db.js";
// import {InvoicesDb} from "./backend/database/invoices-db.js";

//

const connection =  mysql.createConnection("jdbc:mysql://localhost:3309/vify_database");
connection.connect(function(err) {
    if (err) {
        return console.error('error: ' + err.message);
    }

    console.log('Connected to the MySQL server.');
});




// // const sessionDb = new SQLiteSessionStorage(database);
// const shopify = shopifyApp({
//     sessionStorage: new MySQLSessionStorage(
//         'mysql://username:password@host/database',
//     )
//
// const sessionDb = new MySQLSessionStorage(connection)
// // Initialize SQLite DB
// InvoicesDb.db = database;
// InvoicesDb.init().then(r => console.log("Invoice Database connected"));
// // const database_order = new sqlite3.Database(join(process.cwd(), "database.sqlite"));
// // const sessionDb_order = new SQLiteSessionStorage(database_order);
// // OrdersDB.db = database_order;
// // OrdersDB.init().then(r => console.log("Order Database connected"))

const shopify = shopifyApp({
    api: {
        restResources,
    },
    auth: {
        path: "/api/auth",
        callbackPath: "/api/auth/callback",
    },
    webhooks: {
        path: "/api/webhooks",
    },
    sessionStorage: new MySQLSessionStorage(
        'jdbc:mysql://localhost:3309/vify_database',
    )
});

export default shopify;
