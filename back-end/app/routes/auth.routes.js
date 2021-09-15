// written with reference to this tutorial: https://www.bezkoder.com/node-js-mongodb-auth-jwt/

/**
 *  Login authentication routes
 */

const { verifySignUp } = require("../middlewares");
const authController = require("../controllers/auth.controller");
const contactController = require("../controllers/contact.controller");
const categoryController = require("../controllers/category.controller");

/**
 * POST /api/auth/signup
 * POST /api/auth/signin
 * DELETE /api/auth/deleteAccount
 * @param app
 */
module.exports = function (app) {
    app.use(function (req, res, next) {
        res.header("Access-Control-Allow-Headers", "x-access-token, Origin, Content-Type, Accept");
        next();
    });

    app.post(
        "/api/auth/signup",
        [verifySignUp.checkRequiredFields, verifySignUp.checkDuplicateEmail, verifySignUp.checkRolesExisted],
        authController.signup, contactController.initialiseContact, categoryController.initialiseCategory
    );

    app.post("/api/auth/signin", authController.signin);

    app.delete("/api/auth/deleteAccount", authController.deleteAccount);
};
