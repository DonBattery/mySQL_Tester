/* eslint linebreak-style: ['error', 'windows'] */

// mySQL connection objects
const rdsNandiDB = {
  host: 'aa19zvqjywe7nol.ceovs74iifmf.eu-central-1.rds.amazonaws.com',
  port: 3306,
  user: 'nandi',
  password: 'nandi111',
  database: 'test'
};

const envDB = {
  host: process.env.RDS_HOSTNAME,
  user: process.env.RDS_USERNAME,
  password: process.env.RDS_PASSWORD,
  database: process.env.RDS_DB_NAME,
  port: process.env.RDS_PORT
};

// We will use this one!
const myDB = envDB;

// Express App port
const PORT = 8080;

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
app.listen(PORT, () => {
  tools.serverLog(`Test Server litening on PORT ${PORT}`);
});
