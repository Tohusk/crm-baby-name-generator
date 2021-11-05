/**
 * routes relating to products
 */

const { verifyProduct, authJwt } = require("../middlewares");
const controller = require("../controllers/product.controller");

/**
 * POST /api/product/new
 * POST /api/product/update
 * GET /api/product/get
 * GET /api/product/getAll
 * DELETE /api/product/delete
 * GET /api/product/getTotal
 * GET /api/product/getMostPopular
 * GET /api/product/getStats
 */
module.exports = function (app) {
    app.use(function (req, res, next) {
        res.header("Access-Control-Allow-Headers", "x-access-token, Origin, Content-Type, Accept");
        next();
    });

    app.post(
        "/api/product/new",
        [
            authJwt.verifyToken,
            verifyProduct.checkRequiredFields,
            verifyProduct.checkDuplicateUserProduct,
            verifyProduct.checkProductCategoryExists,
        ],
        controller.newProduct
    );

    app.post("/api/product/update", [authJwt.verifyToken, verifyProduct.checkRequiredFieldsUpdate], controller.updateProduct);

    app.get("/api/product/get", [authJwt.verifyToken], controller.getProduct);

    app.get("/api/product/getAll", [authJwt.verifyToken], controller.getAllProducts);

    app.delete("/api/product/deleteOne", [authJwt.verifyToken, verifyProduct.checkProductNotInUse], controller.deleteOneProduct);

    app.get("/api/product/getTotal", [authJwt.verifyToken], controller.getTotalProducts);

    app.get("/api/product/getMostPopular", [authJwt.verifyToken], controller.getMostPopularProduct);

    app.get("/api/product/getStats", [authJwt.verifyToken], controller.getProductStats);
};
