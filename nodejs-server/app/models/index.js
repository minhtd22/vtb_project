const mongoose = require('mongoose');
const dbConfig = require('../config/db.config');

mongoose.Promise = global.Promise;
const db = {};

db.mongoose = mongoose;
db.url = dbConfig.url;
db.user = require('./user.model');
db.role = require('./role.model');
db.product = require('./product.model');

db.ROLES = ['user', 'admin', 'moderator'];

module.exports = db;
