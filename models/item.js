var mongoose = require('mongoose');

var itemSchema = mongoose.Schema({
    item: String
});

var Item = mongoose.model('Item', itemSchema);

module.exports = Item;
