const mongoose = require("mongoose");

/**
 * model for a product's category
 */
const Category = mongoose.model(
    "Category",
    new mongoose.Schema({
        user: { type: mongoose.Schema.Types.ObjectId, ref: "User", unique: true },
        name: {
            type: String,
            required: true
        }
    })
);

module.exports = Category;
