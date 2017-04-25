var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var index = require('./routes/index');

app.set('port', (process.env.PORT || 3001));

app.use('/', index);
app.use(express.static(__dirname + 'client/build'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});
