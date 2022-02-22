const express = require('express');
const createError = require('http-errors');
const morgan = require('morgan');
require('dotenv').config();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan('dev'));

const Twitter = require('twitter');

const client = new Twitter({
  bearer_token: 'AAAAAAAAAAAAAAAAAAAAAPoQZQEAAAAAiehjJSsU8kTcXUqQ%2FX%2BtpwbbxpQ%3DaEvdEsZayIlBNTJ9jScl2RmKF7LP8Kaz54wVbrpbjQrNW36r3N'
});

app.get('/users', async (req, res, next) => {
  const screen_name = req.query.screen_name;
  client.get('users/show', {q: 'Twitter%20API', screen_name}, function(error, user, response) {
    res.send(user)
 }
 );
});

app.use('/api', require('./routes/api.route'));

app.use((req, res, next) => {
  next(createError.NotFound());
});

app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.send({
    status: err.status || 500,
    message: err.message,
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 @ http://localhost:${PORT}`));
