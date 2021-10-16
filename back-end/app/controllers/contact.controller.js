/**
 * Controllers related to contacts of a user
 */

const db = require("../models");
const Contacts = db.contacts;
// const Product = db.product;
const Transaction = db.transaction;
// const Category = db.category;
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
        const contact = await Contacts.findOne({ user: mongoose.Types.ObjectId(req.query.userId) }).select({
            customers: { $elemMatch: { _id: mongoose.Types.ObjectId(req.query.contactId) } },
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
 * Controller for deleting contacts entry for a given user
 */
const deleteAllContacts = async (userId) => {
    await Contacts.findOneAndDelete({ user: mongoose.Types.ObjectId(userId) });
};

/**
 * given a contactId, returns average satisfaction rating and returns their top (at most) 3 categories
 */
const getContactStatistics = async (req, res) => {
    try {
        const transaction = await Transaction.findOne(
        {user: mongoose.Types.ObjectId(req.query.userId),
        transactions: { $elemMatch: { contactId: mongoose.Types.ObjectId(req.query.contactId) } }}
        );

        const avgRating = await getContactAvgRating(transaction.transactions);

        // const topCategories = await getContactTopCategories(transaction.transactions, req.query.userId);

        res.json({averageRating: avgRating});
    } catch (err) {
        res.status(500).send({ message: err });
    }
};

/**
 * Auxiliary function to get top (at most) 3 categories of a contact
 */
// const getContactTopCategories = async (transactions, userId) => {
//     let categoryCount = new Map();

//     // iterate through every transaction
//     for (let i = 0; i < transactions.length; i++) {
//         // iterate through products in a transaction
//         let products = transactions[i].productsPurchased;

//         for (let j = 0; j < products.length; j++) {
//             // search for product using productId
//             let product = await Product.findOne({ user: mongoose.Types.ObjectId(userId)},
//             {products: { $elemMatch: { _id: mongoose.Types.ObjectId(products[j]["productId"]) }}});

//             // get the value from the "categoryId" field
//             let categoryId = product["products"][0]["categoryId"];

//             // categories are optional for products. Skip if product doesn't have categoryId
//             if (categoryId == null)
//                 continue;

//             // Do a similar thing as above but this time, getting categoryName
//             let category = await Category.findOne({user: mongoose.Types.ObjectId(userId)}).select({
//                 categories: { $elemMatch: { _id: mongoose.Types.ObjectId(categoryId) } }
//             });

//             let categoryName = category["categories"][0]["name"];

//             // increment categoryCount
//             if (categoryCount.has(categoryName))
//                 categoryCount.set(categoryName, categoryCount.get(categoryName)+1);
//             else
//                 categoryCount.set(categoryName, 1);
//             console.log(categoryCount);
//         }
//     }

//     return getTopNMap(categoryCount, 3);
// }

/**
 * sorts map and returns at most top n items
 * @param map
 * @param n
 * @returns {Promise<Map<any, any>>}
 */
// const getTopNMap = async (map, n) => {
//     // sort map (sort code from https://stackoverflow.com/questions/37982476/how-to-sort-a-map-by-value-in-javascript)
//     const sortedMapKeys = (new Map([...map.entries()].sort((a, b) => b[1] - a[1]))).keys();
//     const topNMap = new Map();

//     // i < n because we only want top n items
//     for (let i = 0; i < sortedMapKeys.size && i < n; i++) {
//         topNMap.set(sortedMapKeys[i], map.get(sortedMapKeys[i]));
//     }
//     return topNMap;
// }

/**
 * Auxiliary function to help statistics get average rating for a contact
 */
const getContactAvgRating = async (transactions) => {
    let n = transactions.length;
    let sum = 0;
    for (let i = 0; i < n; i++) {
        let currRating = transactions[i]["transactionRating"];
        if (!isNaN(currRating))
            sum += currRating;
        else
            n--;    // don't wanna count transactions without ratings in our average
    }

    if (n === 0)
        return {"average score": 0};

    const avg = sum/n;

    return {"average score": avg};
};

module.exports = {
    getContactStatistics,
    initialiseContact,
    newContact,
    updateContact,
    getContact,
    getAllContacts,
    deleteOneContact,
    deleteAllContacts,
};
