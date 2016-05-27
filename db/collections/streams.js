var db = require('../config');
var Stream = require('../models/stream');

var Streams = new db.Collection();

Streams.model = Stream;

module.exports = Streams;