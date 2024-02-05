const express = require('express');
const path = require('path');
const request = require('request');
const app = express();

app.use(express.static(path.join(__dirname, 'build')));

app.get('/currencies', (req, res) => {
  request('https://www.cnb.cz/en/financial-markets/foreign-exchange-market/central-bank-exchange-rate-fixing/central-bank-exchange-rate-fixing/daily.txt',
  (error, response, body) => {
    res.send(body)
  });
});

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(process.env.PORT || 3000);

module.exports = app;
