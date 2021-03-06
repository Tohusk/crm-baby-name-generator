/**
 * routes relating to categories
 */

const { verifyCategory, authJwt } = require("../middlewares");
const controller = require("../controllers/category.controller");

/**
 * POST /api/category/new
 * POST /api/category/update
 * GET /api/category/get
 * GET /api/category/getAll
 * DELETE /api/category/delete
 */
module.exports = function (app) {
    app.use(function (req, res, next) {
        res.header("Access-Control-Allow-Headers", "x-access-token, Origin, Content-Type, Accept");
        next();
    });

    app.post(
        "/api/category/new",
        [authJwt.verifyToken, verifyCategory.checkRequiredFields, verifyCategory.checkDuplicateUserCategory],
        controller.newCategory
    );

    app.post("/api/category/update", [authJwt.verifyToken, verifyCategory.checkRequiredFieldsUpdate], controller.updateCategory);

    app.get("/api/category/get", [authJwt.verifyToken], controller.getCategory);

    app.get("/api/category/getAll", [authJwt.verifyToken], controller.getAllCategories);

    app.delete("/api/category/deleteOne", [authJwt.verifyToken, verifyCategory.checkCategoryNotInUse], controller.deleteOneCategory);
};
