import { Client } from "pg";

const env = process.env.NODE_ENV || "development";
const config = require(__dirname + "/../config/config.json")[env];

const client = new Client({
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
