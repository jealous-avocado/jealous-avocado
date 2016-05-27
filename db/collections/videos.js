var db = require('../config');
var Video = require('../models/video');

var Videos = new db.Collection();

Videos.model = Video;

module.exports = Videos;