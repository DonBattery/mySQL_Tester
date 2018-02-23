/* eslint linebreak-style: ['error', 'windows'] */

// mySQL connection objects
const rdsNandiDB = {
  host: '',
  port: 0,
  user: '',
  password: '',
  database: '',
};

const envDB = {
  host: process.env.RDS_HOSTNAME,
  port: process.env.RDS_PORT,
  user: process.env.RDS_USERNAME,
  password: process.env.RDS_PASSWORD,
  database: process.env.RDS_DB_NAME,
};

// We will use this one!
const myDB = envDB;

// Express App host:port
const HOST = 'localhost';

const PORT = 6969;

// Packages and tools
const tools = require('./tools');

const express = require('express');

const mysql = require('mysql');

// App and DB
const app = express();

const db = mysql.createConnection(myDB);

// Log Process
console.log(process);

// Test DB
tools.testDB(db, tools.serverLog);

// Enable this for ip addresses
app.enable('trust proxy');

// For parsing JSON
app.use(express.json());

// Logger midleware
app.use((req, res, next) => {
  tools.serverLog(`Request from ${tools.getIPaddress(req.ip)} ${req.method} ${req.url}`);
  next();
});

// Host static files (HTML CSS JS)
app.use(express.static('page'));

// GET Request
app.get('/get', (req, res) => {
  tools.askDB(db, 'select * from users', (rows) => {
    res.json({ Result: rows });
  }, tools.serverLog);
});

// POST Request
app.post('/post', (req, res) => {
  tools.askDB(db, "insert into users (username) values ('Panna')", () => {
    tools.serverLog('Db query Succes');
    res.json({ result: 'Succes' });
  }, (err) => {
    tools.serverLog('Database Error '.concat(err));
    res.status(500).json({ result: 'DB Error' });
  });
});

// Start server!
app.listen(PORT, HOST, () => {
  tools.serverLog(`Test Server litening on ${HOST} : ${PORT}`);
});
