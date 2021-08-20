// written with reference to this tutorial: https://www.bezkoder.com/node-js-mongodb-auth-jwt/

const db = require("../models");
const ROLES = db.ROLES;
const User = db.user;

/**
 * check if the email of the account is already in use
 */
checkDuplicateEmail = (req, res, next) => {
    User.findOne({
        email: req.body.email
    }).exec((err, user) => {
        if (err) {
            res.status(500).send({ message: err });
            return;
        }

        if (user) {
            res.status(400).send({ message: "Failed! Email is already in use!" });
            return;
        }

        next();
    });
};

/**
 * check is a user's role is an existing role
 */
checkRolesExisted = (req, res, next) => {
    if (req.body.roles) {
        for (let i = 0; i < req.body.roles.length; i++) {
            if (!ROLES.includes(req.body.roles[i])) {
                res.status(400).send({
                    message: `Failed! Role ${req.body.roles[i]} does not exist!`
                });
                return;
            }
        }
    }

    next();
};

const verifySignUp = {
    checkDuplicateEmail,
    checkRolesExisted
};

module.exports = verifySignUp;
