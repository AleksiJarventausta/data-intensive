var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var customerSchema = new Schema({
  _id: Schema.Types.ObjectId,

  firstname: {
    type: String,
    required: true,
  },
  lastname: {
    type: String,
    required: true,
  },
  address: {
    type: String,
  },
  ssn: {
    type: String,
    required: true,
  },
  image: {
    type: Buffer
  }
});

module.exports = customerSchema;
