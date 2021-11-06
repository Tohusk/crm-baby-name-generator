// written with reference to this tutorial: https://www.bezkoder.com/node-js-mongodb-auth-jwt/

/**
 *  Login authentication routes
 */

const { verifyUser, authJwt } = require("../middlewares");
const controller = require("../controllers/user.controller");
/**
 * POST /api/user/signup
 * POST /api/user/update
 * POST /api/user/signin
 * DELETE /api/user/deleteAccount
 */
module.exports = function (app) {
    app.use(function (req, res, next) {
        res.header("Access-Control-Allow-Headers", "x-access-token, Origin, Content-Type, Accept");
        next();
    });

    app.post(
        "/api/user/signup",
        [verifyUser.checkRequiredFields, verifyUser.checkDuplicateEmail, verifyUser.checkRolesExisted],
        controller.signup
    );

    app.post("/api/user/update", [authJwt.verifyToken, verifyUser.checkRequiredFieldsUpdate], controller.updateUser);

    app.post("/api/user/signin", controller.signin);

    app.delete("/api/user/deleteAccount", [authJwt.verifyToken], controller.deleteAccount);
};
