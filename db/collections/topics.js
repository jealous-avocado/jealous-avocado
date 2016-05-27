var db = require('../config');
var Topic = require('../models/topic');

var Topics = new db.Collection();

Topics.model = Topic;

module.exports = Topics;