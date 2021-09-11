// written with reference to this tutorial: https://www.bezkoder.com/node-js-mongodb-auth-jwt/

const mongoose = require("mongoose");

/**
 * model for user
 */
const User = mongoose.model(
    "User",
    new mongoose.Schema({
        email: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
        },
        name: {
            type: String,
            required: true,
        },
        businessName: String,
        roles: [{ type: mongoose.Schema.Types.ObjectId, ref: "Role" }],
    })
);

module.exports = User;
