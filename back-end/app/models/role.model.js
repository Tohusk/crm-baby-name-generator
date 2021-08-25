// written with reference to this tutorial: https://www.bezkoder.com/node-js-mongodb-auth-jwt/

const mongoose = require("mongoose");

/**
 * a role model ;)
 */
const Role = mongoose.model(
    "Role",
    new mongoose.Schema({
        name: String
    })
);

module.exports = Role;
