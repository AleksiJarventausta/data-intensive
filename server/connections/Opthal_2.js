const mongoose = require("mongoose");

const conn = mongoose.createConnection(process.env.OPHTHALMOLOGIST_2);
conn.model("Image", require("../schemas/DicomImage"));
conn.model("Customer", require("../schemas/Customer"));
module.exports = conn;
