/**
 * Controllers related to contacts of a user
 */

const db = require("../models");
const Contacts = db.contacts;
const Product = db.product;
const Transaction = db.transaction;
const Category = db.category;
const mongoose = require("mongoose");

/**
 * Controller for initalise a user's contacts list
 */
const initialiseContact = async (userId) => {
    await Contacts.findOneAndDelete({ user: userId });

    // new contacts
    const contacts = new Contacts({
        user: userId,
    });

    // save contacts
    await contacts.save();
};

/**
 * Controller for saving a new contact
 */
const newContact = async (req, res) => {
    try {
        // new contact model
        const newContact = {
            name: req.body.name,
            email: req.body.email,
            phoneNumber: req.body.phoneNumber,
            companyName: req.body.companyName,
            description: req.body.description,
            dateAdded: new Date(),
        };

        // add a contact to a user's contact list
        await Contacts.findOneAndUpdate(
            { user: mongoose.Types.ObjectId(req.body.userId) },
            {
                $push: {
                    customers: newContact,
                },
            }
        );
        res.send({ message: "New contact added successfully!" });
    } catch (err) {
        res.status(500).send({ message: err });
        return;
    }
};

/**
 * Controller for updating a contact
 */
const updateContact = async (req, res) => {
    try {
        await Contacts.findOneAndUpdate(
            {
                user: mongoose.Types.ObjectId(req.body.userId),
                customers: { $elemMatch: { _id: mongoose.Types.ObjectId(req.body.contactId) } },
            },
            {
                $set: {
                    "customers.$.name": req.body.name,
                    "customers.$.email": req.body.email,
                    "customers.$.phoneNumber": req.body.phoneNumber,
                    "customers.$.companyName": req.body.companyName,
                    "customers.$.description": req.body.description,
                },
            }
        );
        res.send({ message: "Contact updated successfully!" });
    } catch (err) {
        res.status(500).send({ message: err });
        return;
    }
};

/**
 * Controller to get one contact
 */
const getContact = async (req, res) => {
    try {
        const contact = await getOneContact(req.query.userId, req.query.contactId);
        res.json(contact);
    } catch (err) {
        res.status(500).send({ message: err });
        return;
    }
};

/**
 * function that accesses db and returns one contact
 */
const getOneContact = async (userId, contactId) => {
    const contact = await Contacts.findOne({ user: mongoose.Types.ObjectId(userId) }).select({
        customers: { $elemMatch: { _id: mongoose.Types.ObjectId(contactId) } },
    });
    return contact.customers[0];
};

/**
 * Controller to get one contact by name
 */
const getContactByName = async (req, res) => {
    try {
        const contact = await Contacts.findOne({ user: mongoose.Types.ObjectId(req.query.userId) }).select({
            customers: { $elemMatch: { name: req.query.name } },
        });
        res.json(contact.customers[0]);
    } catch (err) {
        res.status(500).send({ message: err });
        return;
    }
};

/**
 * Controller to get a user's contact list
 */
const getAllContacts = async (req, res) => {
    try {
        const contacts = await Contacts.findOne({ user: mongoose.Types.ObjectId(req.query.userId) });
        res.json(contacts.customers);
    } catch (err) {
        res.status(500).send({ message: err });
        return;
    }
};

/**
 * Controller for deleting one contact
 */
const deleteOneContact = async (req, res) => {
    try {
        await Contacts.findOneAndUpdate(
            { user: mongoose.Types.ObjectId(req.body.userId) },
            { $pull: { customers: { _id: mongoose.Types.ObjectId(req.body.contactId) } } }
        );
        res.send({ message: "Contact deleted successfully" });
    } catch (err) {
        res.status(500).send({ message: err });
    }
};

/**
 * function for deleting contacts entry for a given user
 */
const deleteAllContacts = async (userId) => {
    await Contacts.findOneAndDelete({ user: mongoose.Types.ObjectId(userId) });
};

/**
 * given a contactId, returns average satisfaction rating and returns their top (at most) 3 categories with category counts
 */
const getContactStatistics = async (req, res) => {
    try {
        // gets all the transactions for a user
        const queryResponse = await Transaction.findOne({
            user: mongoose.Types.ObjectId(req.query.userId) /*,
        transactions: { $elemMatch: { contactId: mongoose.Types.ObjectId(req.query.contactId) } }*/,
        });

        if (!queryResponse || queryResponse.transactions.length == 0) {
            res.json({ averageRating: null, topCategories: [] });
            return;
        }

        // find all the transactions made by this customer
        const transactions = queryResponse.transactions;
        const transactionsByThisCustomer = [];
        for (const t of transactions) {
            if (t.contactId.toString() === req.query.contactId.toString()) {
                transactionsByThisCustomer.push(t);
            }
        }

        const avgRating = await getContactAvgRating(transactionsByThisCustomer);

        const topCategories = await getContactTopCategories(transactionsByThisCustomer, req.query.userId);

        res.json({ averageRating: avgRating, topCategories: topCategories });
    } catch (err) {
        res.status(500).send({ message: err });
    }
};

/**
 * Auxiliary function to get top (at most) 3 categories of a contact
 */
const getContactTopCategories = async (transactions, userId) => {
    let categoryCount = new Map();

    // iterate through every transaction
    for (let i = 0; i < transactions.length; i++) {
        // iterate through products in a transaction
        let products = transactions[i].productsPurchased;
        for (let j = 0; j < products.length; j++) {
            // search for product using productId
            let product = await Product.findOne(
                { user: mongoose.Types.ObjectId(userId) },
                { products: { $elemMatch: { _id: mongoose.Types.ObjectId(products[j]["productId"]) } } }
            );
            // get the value from the "categoryId" field
            let categoryId = product["products"][0]["categoryId"]?.toString();

            // categories are optional for products. Skip if product doesn't have categoryId
            if (categoryId == null) continue;

            // increment categoryCount
            if (categoryCount.has(categoryId))
                categoryCount.set(categoryId, categoryCount.get(categoryId) + products[j].quantity);
            else categoryCount.set(categoryId, products[j].quantity);
        }
    }

    // sort categories by count
    const sortedCategories = new Map([...categoryCount.entries()].sort((a, b) => b[1] - a[1]));

    // get top 3 into a list
    let count = 0;
    let topCategories = [];
    for (const c of sortedCategories.keys()) {
        const queryResponse = await Category.findOne({ user: mongoose.Types.ObjectId(userId) }).select({
            categories: { $elemMatch: { _id: mongoose.Types.ObjectId(c) } },
        });
        const oneCategory = queryResponse.categories[0];
        topCategories.push(oneCategory);

        count++;
        if (count == 3) {
            break;
        }
    }

    return topCategories;
};

/**
 * Auxiliary function to help statistics get average rating for a contact
 */
const getContactAvgRating = async (transactions) => {
    let n = transactions.length;
    let sum = 0;
    for (let i = 0; i < n; i++) {
        let currRating = transactions[i]["transactionRating"];
        if (!isNaN(currRating)) sum += currRating;
        else n--; // don't wanna count transactions without ratings in our average
    }

    if (n === 0) return 0;

    const avg = sum / n;

    return avg;
};

/**
 * function that finds the average customer rating
 */
const getUserAvgRating = async (req, res) => {
    try {
        const queryResponse = await Transaction.findOne({
            user: mongoose.Types.ObjectId(req.query.userId) /*,
            transactions: { $elemMatch: { contactId: mongoose.Types.ObjectId(req.query.contactId) } }*/,
        });

        // if no transactions recorded for the user
        if (!queryResponse || queryResponse.transactions.length == 0) {
            res.json({ avgUserRating: null });
            return;
        }

        const transactions = queryResponse.transactions;
        const contacts = await Contacts.findOne({ user: mongoose.Types.ObjectId(req.query.userId) });

        let total = 0;
        let validScoreContacts = 0;

        for (const contact of contacts.customers) {
            // filter transactions made only by this customer
            const transactionsByThisCustomer = [];
            for (const t of transactions) {
                if (t.contactId.toString() === contact._id.toString()) {
                    transactionsByThisCustomer.push(t);
                }
            }

            // find the average rating for this customer
            const avgRating = await getContactAvgRating(transactionsByThisCustomer);
            if (avgRating !== 0) {
                validScoreContacts += 1;
                total += avgRating;
            }
        }

        // calculate average
        let avgUserRating = total / validScoreContacts;
        avgUserRating = Math.round(avgUserRating * 100) / 100;

        res.json({ avgUserRating: avgUserRating });
    } catch (err) {
        res.status(500).send({ message: err });
    }
};

module.exports = {
    getContactStatistics,
    getUserAvgRating,
    initialiseContact,
    newContact,
    updateContact,
    getContact,
    getOneContact,
    getAllContacts,
    getContactByName,
    deleteOneContact,
    deleteAllContacts,
};
