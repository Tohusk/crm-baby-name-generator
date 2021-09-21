const authJwt = require("./authJwt");
const verifySignUp = require("./verifySignUp");
const verifyContact = require("./verifyContact");
const verifyCategory = require("./verifyCategory");
const verifyProduct = require("./verifyProduct");
const verifyTransaction = require("./verifyTransaction");

module.exports = {
    authJwt,
    verifySignUp,
    verifyContact,
    verifyCategory,
    verifyProduct,
    verifyTransaction
};
