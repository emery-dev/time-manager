var express = require('express');
var path = require('path');
var logger = require('morgan');
var bodyParser = require('body-parser');

var index = require('./routes/index');

var app = express();

const url = process.env.DATABASE_URL || `postgress://localhost:3000`;

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('./build'));
}

app.use(express.static(path.join(__dirname + '/public')));

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/', index); //Calling api routes through /

app.listen(app.get('port'), () => {
  console.log(`Find the server at: http://localhost:${app.get('port')}/`); // eslint-disable-line no-console
});
