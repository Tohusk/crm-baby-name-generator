const authJwt = require("./authJwt");
const verifySignUp = require("./verifyUser");
const verifyContact = require("./verifyContact");
const verifyCategory = require("./verifyCategory");
const verifyProduct = require("./verifyProduct");
const verifyTransaction = require("./verifyTransaction");

module.exports = {
    authJwt,
    verifyUser: verifySignUp,
    verifyContact,
    verifyCategory,
    verifyProduct,
    verifyTransaction,
};
