const mongoose = require("mongoose");

/**
 * model for a contact
 */
const Contact = mongoose.model(
    "Contact",
    new mongoose.Schema({
        name: String,
        email: String,
        phoneNumber: String,
        companyName: String,
        description: String
    })
);

module.exports = Contact;
