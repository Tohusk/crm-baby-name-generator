/**
 * Controllers related to transactions of a user
 */

const db = require("../models");
const Transaction = db.transaction;
const mongoose = require("mongoose");
const contactController = require("./contact.controller");

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
        const total = calcTotal(req.body.productsPurchased);

        const newTransaction = {
            contactId: mongoose.Types.ObjectId(req.body.contactId),
            productsPurchased: parsePurchaseList(req, res),
            transactionRating: req.body.transactionRating,
            transactionTotal: total,
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
        console.log(err);
        res.status(500).send({ message: err });
    }
};

/**
 * function to go through the list of products in JSON request and create structure
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

const calcTotal = (purchases) => {
    let total = 0;
    for (const p of purchases) {
        total += p.quantity * p.price;
    }
    return total;
};

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
                    "transactions.$.transactionTotal": calcTotal(req.body.productsPurchased),
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
        res.json(transaction.transactions[0]); // 0th index gives productsPurchased
    } catch (err) {
        res.status(500).send({ message: err });
    }
};

/**
 * Controller to get a user's transaction list
 */
const getAllTransactions = async (req, res) => {
    try {
        const allTransactions = await getAllTransactionsForUser(req.query.userId);

        let processedTransactions = [];

        for (const t of allTransactions) {
            const contact = await contactController.getOneContact(req.query.userId, t.contactId);

            const transactionInfo = {
                _id: t?._id,
                contactName: contact?.name,
                dateAdded: t?.dateAdded,
                transactionTotal: t?.transactionTotal,
            };

            processedTransactions.push(transactionInfo);
        }

        res.json(processedTransactions.reverse());
    } catch (err) {
        console.log(err);
        res.status(500).send({ message: err });
    }
};

/**
 * Method for the logic of getting all the transactions of a user from db
 */
const getAllTransactionsForUser = async (userId) => {
    const allTransaction = await Transaction.findOne({ user: userId });
    return allTransaction.transactions;
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
 * function for deleting all transaction entries for a given user
 */
const deleteAllTransactions = async (userId) => {
    await Transaction.findOneAndDelete({ user: mongoose.Types.ObjectId(userId) });
};

/**
 * controller for getting total revenue and transaction satisfaction stats
 */
const getSalesStats = async (req, res) => {
    try {
        const allTransactions = await getAllTransactionsForUser(req.query.userId);

        // initialise stats
        let totalRevenue = 0;
        let ratingsMap = new Map([
            ["1", 0],
            ["2", 0],
            ["3", 0],
            ["4", 0],
            ["5", 0],
        ]);

        for (const t of allTransactions) {
            // update total
            if (t.transactionTotal) {
                totalRevenue += t.transactionTotal;
            }

            // update ratings map
            if (ratingsMap.get(t.transactionRating.toString())) {
                ratingsMap.set(t.transactionRating.toString(), ratingsMap.get(t.transactionRating.toString()) + 1);
            } else {
                ratingsMap.set(t.transactionRating.toString(), 1);
            }
        }

        // convert ratings map into an array
        const ratingsArray = [];
        for (const t of ratingsMap.keys()) {
            ratingsArray.push(ratingsMap.get(t));
        }

        const stats = {
            totalRevenue: totalRevenue,
            ratingsFreq: ratingsArray,
        };

        res.json(stats);
    } catch (err) {
        console.log(err);
        res.status(500).send({ message: err });
    }
};

module.exports = {
    initialiseTransaction,
    newTransaction,
    updateTransaction,
    getTransaction,
    getAllTransactions,
    deleteOneTransaction,
    deleteAllTransactions,
    getAllTransactionsForUser,
    getSalesStats,
};
