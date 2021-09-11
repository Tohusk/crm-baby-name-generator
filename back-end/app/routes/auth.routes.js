// written with reference to this tutorial: https://www.bezkoder.com/node-js-mongodb-auth-jwt/

/**
 *  Login authentication routes
 */

const { verifySignUp } = require("../middlewares");
const controller = require("../controllers/auth.controller");

/**
 * POST /api/auth/signup
 * POST /api/auth/update
 * POST /api/auth/signin
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
        controller.signup
    );

    app.post("/api/auth/update", [verifySignUp.checkRequiredFieldsUpdate], controller.updateUser);

    app.post("/api/auth/signin", controller.signin);
};
