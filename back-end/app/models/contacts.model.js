const mongoose = require("mongoose");

/**
 * model for a user's contacts list
 */
const Contacts = mongoose.model(
    "Contacts",
    new mongoose.Schema({
        user: { type: mongoose.Schema.Types.ObjectId, ref: "User", unique: true },
        customers: [
            {
                name: {
                    type: String,
                    required: true,
                },
                email: String,
                phoneNumber: String,
                companyName: String,
                description: String,
                dateAdded: Date
            },
        ],
    })
);

module.exports = Contacts;
