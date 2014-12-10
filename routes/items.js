var Item = require('../models/item.js');
var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var router = express.Router();
var urlencodedParser = bodyParser.urlencoded({ extended: false });

router.route('/')
  .get(function (req, res) {
    Item.find(function (err, items) {
      if (err) return console.error(err);
      res.send(items);
    });
  })
  .post(urlencodedParser, function (req, res) {
    if (!req.param('item')) {
      res.send('Item not valid');
      res.statusCode = 400;
    } else {
      var item = new Item({ item: req.param('item') });
      console.log(item);
      item.save(function (err, item) {
        if (err) return console.error(err);
        res.send('adding ' + item);
      });
    }
  });

router.route('/:id')
  .get(function (req, res) {
    Item.find({'_id': mongoose.Types.ObjectId(req.param('id'))}, function (err, item) {
      if (err) return console.error(err);
      res.send(item);
    });
  })
  .put(function (req, res) {
    Item.findByIdAndUpdate(mongoose.Types.ObjectId(req.param('id')), {'item': req.param('item')}, function (err, result){
        if (err) return console.error(err);
        res.send(result);
    });
  })
  .delete(function (req, res) {
    Item.remove({'_id':mongoose.Types.ObjectId(req.param('id'))}, function (err, result) {
      if (err) return console.error(err);
      res.send({});
    });
  }); 

module.exports = router;
