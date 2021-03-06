var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var userSchema = new Schema({
  _id: Schema.Types.ObjectId,

  username: {
    type: String,
    required: true
  },
  email: {
    type: String
  },
  profession: {
    type: Number
  },
  own_db: {
    type: String
  },
  password: {
    type: String,
    required: true
  },
});

module.exports = userSchema;