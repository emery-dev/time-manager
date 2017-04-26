var express = require('express');
var path = require('path');
var logger = require('morgan');
var bodyParser = require('body-parser');
var pgp = require('pg-promise');
var index = require('./routes/index');

var app = express();

const url = process.env.DATABASE_URL || `http://localhost:3001`;
//const db = pgp({url});

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

//pgp.defaults.ssl = true;
// pgp.connect(url, function(err, client) {
//   if (err) throw err;
//   console.log('Connected to postgres! Getting schemas...');
//
//   client
//     .query('SELECT * FROM todo;')
//     .on('row', function(row) {
//       console.log(JSON.stringify(row));
//     });
// });

app.listen(app.get('port'), () => {
  console.log('server started on ' + app.get('port'));
});
//console.log('server started on ' ${app.get('port')});
