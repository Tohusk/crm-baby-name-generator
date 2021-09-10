// written with reference to this tutorial: https://www.bezkoder.com/node-js-mongodb-auth-jwt/

const mongoose = require("mongoose");

/**
 * model for user
 */
const User = mongoose.model(
  "User",
  new mongoose.Schema({
    email: String,
    password: String,
    name: String,
    businessName: String,
    roles: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Role",
      },
    ],
  })
);

module.exports = User;
