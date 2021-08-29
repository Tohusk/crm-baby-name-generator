const mongoose = require("mongoose");

/**
 * model for customers for every user
 */
const Customers = mongoose.model(
    "Customers",
    new mongoose.Schema({
        user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        customers: [{ type: mongoose.Schema.Types.ObjectId, ref: "Contact" }]
    })
);

module.exports = Customers;
