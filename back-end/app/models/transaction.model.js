const mongoose = require("mongoose");
/**
 * model for a transaction
 */
const Transaction = mongoose.model(
    "Transaction",
    new mongoose.Schema({
        user: { type: mongoose.Schema.Types.ObjectId, ref: "User", unique: true },
        transactions: [
            {
                productsPurchased: [ {
                            productId: {
                                type: mongoose.Schema.Types.ObjectId,
                                ref: "Product",
                                required: true},
                            quantity: {
                                type: Number,
                                required: true
                            }
                            }],

                contactId: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "Contact",
                    required: true
                },
            },
        ],
    })
);

module.exports = Transaction;
