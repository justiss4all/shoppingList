var express = require('express');
var mongoose = require('mongoose');
var credentials = require('./lib/mongooseDB.js');
var items = require('./routes/items.js')
var app = express();

app.use(express.static(__dirname + '/public'));
app.use('/items', items);

app.listen(3000, function() {
  console.log('Listening on port 3000');
});

mongoose.connect(credentials);
var db = mongoose.connection;
db.on('error', function callback() {
  console.error('connection error');
});
db.once('open', function () {
  console.log('Connected to MongoLab');
});
