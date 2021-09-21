/**
 * middleware that helps check if a contact is valid
 */

const db = require("../models");
const Contact = db.contacts;
const mongoose = require("mongoose");

/**
 * check if all the required fields are filled
 */
const checkRequiredFields = (req, res, next) => {
    if (!req.body.name) {
        res.status(400).send({ message: "Failed! Need contact name!" });
        return;
    }
    if (!req.body.userId) {
        res.status(400).send({ message: "Failed! Needs to provide userId!" });
        return;
    }

    next();
};

const checkRequiredFieldsUpdate = (req, res, next) => {
    if (!req.body.name) {
        res.status(400).send({ message: "Failed! Need contact name!" });
        return;
    }
    if (!req.body.userId || !req.body.contactId) {
        res.status(400).send({ message: "Failed! Needs to provide userId or contactId!" });
        return;
    }

    next();
};

/**
 * checks if a contact exists for a given user
 * @param req
 * @param res
 * @param next
 */
const checkContactExists = (req, res, next) => {
    try {
        const existingContact = Contact.findOne(
            { user: req.body.userId },
            {
                contacts: {
                    $elemMatch: { _id: mongoose.Types.ObjectId(req.body.contactId) },
                },
            }
        );

        if (existingContact["categories"].length === 0) {
            res.status(400).send({ message: "Failed! Contact does not exist!" });
            return;
        }
        next();
    } catch (err) {
        res.status(500).send({ message: err });
    }
};

const verifyContact = {
    checkRequiredFields,
    checkRequiredFieldsUpdate,
    checkContactExists
};

module.exports = verifyContact;
