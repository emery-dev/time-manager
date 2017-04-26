var express = require('express');
var path = require('path');
var logger = require('morgan');
var bodyParser = require('body-parser');
var pg = require('pg');

var index = require('./routes/index');

var app = express();

const url = process.env.DATABASE_URL || `postgress://localhost:3000`;

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('./build/index'));
}

app.use(express.static(path.join(__dirname + '/public')));

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/', index); //Calling api routes through /

pg.defaults.ssl = true;
pg.connect(url, function(err, client) {
  if (err) throw err;
  console.log('Connected to postgres! Getting schemas...');

  client
    .query('SELECT * FROM todo;')
    .on('row', function(row) {
      console.log(JSON.stringify(row));
    });
});

app.listen(app.get('port'), () => {
  console.log(`Find the server at: http://localhost:${app.get('port')}/`); // eslint-disable-line no-console
});
