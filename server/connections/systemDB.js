const mongoose = require('mongoose');

const conn = mongoose.createConnection(process.env.MONGO_URL);
conn.model('User', require('../schemas/User'));
//conn.model('Log', require('../models/Log'));

module.exports = conn;