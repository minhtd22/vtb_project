const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');
const dbConfig = require('../config/db.config');

mongoose.Promise = global.Promise;
const db = {};

db.mongoose = mongoose;
db.url = dbConfig.url;
db.user = require('./user.model')(mongoose, mongoosePaginate);
db.role = require('./role.model');
db.product = require('./product.model')(mongoose, mongoosePaginate);

db.ROLES = ['user', 'admin', 'moderator'];

module.exports = db;
