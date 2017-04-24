var express = require('express');
var path = require('path');
var logger = require('morgan');
var bodyParser = require('body-parser');

var index = require('./routes/index');

var app = express();

app.use(express.static(path.join(__dirname + '/routes')));

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/', index);
app.use('/today', index);

module.exports = app;
