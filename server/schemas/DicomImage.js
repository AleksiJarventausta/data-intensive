var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var dicomSchema = new Schema({
  _id: Schema.Types.ObjectId,

  name: {
    type: String,
    required: true
  },
  image: {
      type: Buffer
  },
  customer: {
    type: mongoose.Types.ObjectId
  }
});

module.exports = dicomSchema;