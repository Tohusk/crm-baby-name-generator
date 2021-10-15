/**
 * Controllers related to transactions of a user
 */

const db = require("../models");
const Transaction = db.transaction;
const mongoose = require("mongoose");

/**
 * Controller for initialise a user's transaction list
 */
const initialiseTransaction = async (userId) => {
    await Transaction.findOneAndDelete({ user: userId });

    // new transaction
    const transaction = new Transaction({
        user: userId,
    });

    // save transaction
    await transaction.save();
};

/**
 * Controller for saving a new transaction
 */
const newTransaction = async (req, res) => {
    try {
        const newTransaction = {
            contactId: mongoose.Types.ObjectId(req.body.contactId),
            productsPurchased: parsePurchaseList(req, res),
            transactionRating: req.body.transactionRating,
            dateAdded: new Date(),
        };

        // add a transaction to a user's transaction list
        await Transaction.findOneAndUpdate(
            { user: mongoose.Types.ObjectId(req.body.userId) },
            {
                $push: {
                    transactions: newTransaction,
                },
            }
        );
        res.send({ message: "New transaction added successfully!" });
    } catch (err) {
        res.status(500).send({ message: err });
    }
};

/**
 * go through the list of products in JSON request and create structure
 */
function parsePurchaseList(req, res) {
    try {
        const newProductsPurchased = [];
        for (let idx in req.body.productsPurchased) {
            const newProductPurchase = {
                productId: mongoose.Types.ObjectId(req.body.productsPurchased[idx].productId),
                quantity: req.body.productsPurchased[idx].quantity,
            };
            newProductsPurchased.push(newProductPurchase);
        }

        return newProductsPurchased;
    } catch (err) {
        res.status(500).send({ message: err });
    }
}

/**
 * Controller for updating a transaction
 */
const updateTransaction = async (req, res) => {
    try {
        await Transaction.findOneAndUpdate(
            {
                user: mongoose.Types.ObjectId(req.body.userId),
                transactions: { $elemMatch: { _id: mongoose.Types.ObjectId(req.body.transactionId) } },
            },
            {
                $set: {
                    "transactions.$.contactId": req.body.contactId,
                    "transactions.$.productsPurchased": parsePurchaseList(req, res),
                    "transactions.$.transactionRating": req.body.transactionRating,
                },
            }
        );
        res.send({ message: "Transaction updated successfully!" });
    } catch (err) {
        res.status(500).send({ message: err });
    }
};

/**
 * Controller to get one transaction
 */
const getTransaction = async (req, res) => {
    try {
        const transaction = await Transaction.findOne({ user: mongoose.Types.ObjectId(req.query.userId) }).select({
            transactions: { $elemMatch: { _id: mongoose.Types.ObjectId(req.query.transactionId) } },
        });
        res.json(transaction.transactions[0]);
    } catch (err) {
        res.status(500).send({ message: err });
    }
};

/**
 * Controller to get a user's transaction list
 */
const getAllTransactions = async (req, res) => {
    try {
        const allTransactions = await Transaction.findOne({ user: mongoose.Types.ObjectId(req.query.userId) });
        res.json(allTransactions.transactions);
    } catch (err) {
        res.status(500).send({ message: err });
    }
};

/**
 * Controller for deleting one transaction
 */
const deleteOneTransaction = async (req, res) => {
    try {
        await Transaction.findOneAndUpdate(
            { user: mongoose.Types.ObjectId(req.body.userId) },
            { $pull: { transactions: { _id: mongoose.Types.ObjectId(req.body.transactionId) } } }
        );
        res.send({ message: "Transaction deleted successfully" });
    } catch (err) {
        res.status(500).send({ message: err });
    }
};

/**
 * Controller for deleting all transaction entries for a given user
 */
const deleteAllTransactions = async (userId) => {
    await Transaction.findOneAndDelete({ user: mongoose.Types.ObjectId(userId) });
};

const getPastWeekTransactions = async (userId) => {
    const weekLength = 7;
    const today = new Date();
    let sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(today.getDate() - weekLength);

    const transactionsPastWeek = await Transaction.findOne({
        user: mongoose.Types.ObjectId(userId),
        transactions: { $elemMatch: { dateAdded: { $gte: sevenDaysAgo } } }
    });
}

module.exports = {
    initialiseTransaction,
    newTransaction,
    updateTransaction,
    getTransaction,
    getAllTransactions,
    deleteOneTransaction,
    deleteAllTransactions,
    getPastWeekTransactions,
};
