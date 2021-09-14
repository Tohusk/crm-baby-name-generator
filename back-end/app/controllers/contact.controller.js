/**
 * Controllers related to contacts of a user
 */

const db = require("../models");
const Contacts = db.contacts;
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
        const contact = await Contacts.find({ user: mongoose.Types.ObjectId(req.query.userId) }).select({
            customers: { $elemMatch: { _id: mongoose.Types.ObjectId(req.query.contactId) } },
        });
        res.json(contact);
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
        return;
    }
};

/**
 * Controller for deleting contacts entry for a given user
 */
const deleteAllContacts = async (userId) => {
    await Contacts.findOneAndDelete({ user: mongoose.Types.ObjectId(userId) });
};

module.exports = {
    initialiseContact,
    newContact,
    updateContact,
    getContact,
    getAllContacts,
    deleteOneContact,
    deleteAllContacts,
};
