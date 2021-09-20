// written with reference to this tutorial: https://www.bezkoder.com/node-js-mongodb-auth-jwt/
/**
 * Controllers related to authorisation
 */

const config = require("../config/auth.config");
const db = require("../models");
const User = db.user;
const Role = db.role;

const contactController = require("./contact.controller");
const categoryController = require("./category.controller");

const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");

/**
 * controller for a signup request
 */
const signup = async (req, res) => {
    // make new user
    let user = new User({
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 8),
        name: req.body.name,
        businessName: req.body.businessName,
    });

    // assign user roles
    if (req.body.roles) {
        try {
            const roles = await Role.find({ name: { $in: req.body.roles } });
            user.roles = roles.map((role) => role._id);
        } catch (err) {
            res.status(500).send({ message: err });
            return;
        }
    } else {
        try {
            const role = await Role.findOne({ name: "user" });
            user.roles = [role._id];
        } catch (err) {
            res.status(500).send({ message: err });
            return;
        }
    }

    // try to save user
    try {
        user = await user.save();
        await contactController.initialiseContact(user._id);
        await categoryController.initialiseCategory(user._id);
        res.send({ message: "User was registered successfully!" });
    } catch (err) {
        await User.findOneAndDelete({ email: req.body.email });
        res.status(500).send({ message: err });
        return;
    }
};

/**
 * Controller for updating a user's email, name and/or business name
 */
const updateUser = async (req, res) => {
    // update user
    try {
        await User.findOneAndUpdate(
            { _id: mongoose.Types.ObjectId(req.body.userId) },
            { $set: { name: req.body.name, email: req.body.email, businessName: req.body.businessName } }
        );
        res.send({ message: "User updated successfully!" });
    } catch (err) {
        res.status(500).send({ message: err });
        return;
    }
};

/**
 * controller for signin requests
 */
const signin = async (req, res) => {
    // find user with given email
    let user;
    try {
        user = await User.findOne({ email: req.body.email }).populate("roles", "-__v");
    } catch (err) {
        res.status(500).send({ message: err });
        return;
    }

    // user not found
    if (!user) {
        return res.status(404).send({ message: "Incorrect email or password." });
    }

    // check if password is correct
    const passwordIsValid = bcrypt.compareSync(req.body.password, user.password);

    if (!passwordIsValid) {
        return res.status(401).send({
            accessToken: null,
            message: "Incorrect email or password.",
        });
    }

    const token = jwt.sign({ id: user.id }, config.secret, {
        expiresIn: 86400, // 24 hours
    });

    // find authorities
    const authorities = [];

    for (const role of user.roles) {
        authorities.push("ROLE_" + role.name.toUpperCase());
    }

    res.status(200).send({
        id: user._id,
        email: user.email,
        roles: authorities,
        accessToken: token,
    });
};

/**
 * controller for deleting a user
 */
const deleteAccount = async (req, res) => {
    try {
        // delete transactions etc for user
        await contactController.deleteAllContacts(req.body.userId);
        await categoryController.deleteAllCategories(req.body.userId);

        // delete user
        await User.findOneAndDelete({ _id: mongoose.Types.ObjectId(req.body.userId) });

        res.send({ message: "Account deleted successfully" });
    } catch (err) {
        res.status(500).send({ message: err });
        return;
    }
};

module.exports = {
    signup,
    updateUser,
    signin,
    deleteAccount,
};
