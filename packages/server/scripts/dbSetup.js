"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pg_1 = require("pg");
const env = process.env.NODE_ENV || "development";
const config = require(__dirname + "/../config/config.json")[env];
const client = new pg_1.Client({
    user: config.username,
    password: config.password,
    host: config.host,
    database: "postgres",
});
client.connect();
client.query(`CREATE DATABASE ${config.database};`, (err, res) => {
    console.log(err, res);
    client.end();
});
