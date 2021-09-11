// written with reference to this tutorial: https://www.bezkoder.com/node-js-mongodb-auth-jwt/
/**
 * Middlewares that helps with authorisation
 */

const jwt = require("jsonwebtoken");
const config = require("../config/auth.config.js");
const db = require("../models");
const User = db.user;
const Role = db.role;

/**
 * Verify the token
 */
const verifyToken = (req, res, next) => {
  let token = req.headers["x-access-token"];

  if (!token) {
    return res.status(403).send({ message: "No token provided!" });
  }

  jwt.verify(token, config.secret, (err, decoded) => {
    if (err) {
      return res.status(401).send({ message: "Unauthorized!" });
    }
    req.userId = decoded.id;
    next();
  });
};

/**
 * find out if a a user is admin
 */
const isAdmin = async (req, res, next) => {
  try {
    const user = await User.findById(req.userId);
    const roles = await Role.find({ _id: { $in: user.roles } });
    for (const role of roles) {
      if (role.name === "admin") {
        next();
        return;
      }
    }
    res.status(403).send({ message: "Require Admin Role!" });
    return;
  } catch (err) {
    res.status(500).send({ message: err });
    return;
  }
};

/**
 * find out if a a user is moderator
 */
// isModerator = async (req, res, next) => {
//     try {
//         const user = await User.findById(req.userId);
//         const roles = await Role.find({_id: { $in: user.roles }});
//         for (let i = 0; i < roles.length; i++) {
//             if (roles[i].name === "moderator") {
//                 next();
//                 return;
//             }
//         }
//         res.status(403).send({ message: "Require Moderator Role!" });
//         return;
//     } catch (err) {
//         res.status(500).send({ message: err });
//         return;
//     }
// };

const authJwt = {
  verifyToken,
  //isModerator,
  isAdmin,
};
module.exports = authJwt;
