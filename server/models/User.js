const { Schema, default: mongoose } = require("mongoose");

const userSchema = new Schema({
    name: String,
    email: String,
    age: String,
    gender: {
        type: String,
    },
    address: String,
    profileImage: String
  });

  const User = mongoose.model('User', userSchema);

  module.exports = User
