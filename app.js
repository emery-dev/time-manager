var express = require('express');
var path = require('path');
var logger = require('morgan');
var bodyParser = require('body-parser');
var pgp = require('pg-promise');
var index = require('./routes/index');

var app = express();

app.set('port', (process.env.PORT || 3001));

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('./build'));
}

app.use(express.static('./build'));

app.use(express.static(path.join(__dirname + '/public')));

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/', index); //Calling api routes through /

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname + '/public'));
});

app.listen(app.get('port'), () => {
  console.log('server started on ' + app.get('port'));
});
