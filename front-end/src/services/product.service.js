import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL + "/api/product/";

class ProductService {
    async addNewProduct(name, price, categoryId, userId) {
        return axios.post(API_URL + "new", {
            name,
            price,
            categoryId,
            userId,
        });
    }

    async getAllProducts(userId) {
        return axios.get(API_URL + "getAll?userId=" + userId);
    }

    async deleteProduct(userId, productId) {
        return axios.delete(API_URL + "deleteOne", {
            data: {
                userId: userId,
                productId: productId,
            },
        });
    }

    async getTotalProducts(userId) {
        return axios.get(API_URL + "getTotal?userId=" + userId);
    }

    async getMostPopularProduct(userId) {
        return axios.get(API_URL + "getMostPopular?userId=" + userId);
    }

    async getProductStats(userId) {
        return axios.get(API_URL + "getStats?userId=" + userId);
    }
}

export default new ProductService();
