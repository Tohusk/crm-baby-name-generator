// written with reference to this tutorial: https://www.bezkoder.com/node-js-mongodb-auth-jwt/
/**
 * middleware that helps verify signups
 */

const db = require("../models");
const ROLES = db.ROLES;
const User = db.user;

/**
 * check if the email of the account is already in use
 */
const checkDuplicateEmail = async (req, res, next) => {
  try {
    const existingUser = await User.findOne({ email: req.body.email });

    if (existingUser) {
      res.status(400).send({ message: "Failed! Email is already in use!" });
      return;
    }
    next();
  } catch (err) {
    res.status(500).send({ message: err });
    return;
  }
};

/**
 * check is a user's role is an existing role
 */
const checkRolesExisted = (req, res, next) => {
  if (req.body.roles) {
    for (const role of req.body.roles) {
      if (!ROLES.includes(role)) {
        res.status(400).send({
          message: `Failed! Role ${req.body.roles[i]} does not exist!`,
        });
        return;
      }
    }
  }

  next();
};

/**
 * check if all the required fields are filled
 */
const checkRequiredFields = (req, res, next) => {
  if (!req.body.email || !req.body.password || !req.body.name) {
    res.status(400).send({ message: "Failed! Unfilled field!" });
    return;
  }
  next();
};

/**
 * check if all required fields are filled in an update
 */
const checkRequiredFieldsUpdate = (req, res, next) => {
  if (!req.body.email || !req.body.name) {
    res.status(400).send({ message: "Failed! Email and Name cannot be blank!" });
    return;
  }
  if (!req.body.userId) {
    res.status(400).send({ message: "Failed! Needs to provide userId!" });
    return;
  }
  next();
}

const verifySignUp = {
  checkRequiredFields,
  checkDuplicateEmail,
  checkRolesExisted,
  checkRequiredFieldsUpdate
};

module.exports = verifySignUp;
