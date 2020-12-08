const mongoose = require('mongoose');

const conn = mongoose.createConnection(process.env.OPTICIAN_1);
conn.model('Image', require('../schemas/DicomImage'));
//conn.model('Customer', require('../schemas/Customer'));
module.exports = conn;