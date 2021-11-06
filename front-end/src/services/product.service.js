import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL + "/api/product/";

class ProductService {
    async addNewProduct(name, price, categoryId, userId) {
        return axios.post(API_URL + "new", {
            name,
            price,
            categoryId,
            userId,
        }, {
            headers: {'x-access-token': JSON.parse(localStorage.getItem("user")).accessToken},
        });
    }

    async getAllProducts(userId) {
        return axios.get(API_URL + "getAll?userId=" + userId, {
            headers: {'x-access-token': JSON.parse(localStorage.getItem("user")).accessToken},
        });
    }

    async deleteProduct(userId, productId) {
        return axios.delete(API_URL + "deleteOne", {
            data: {
                userId: userId,
                productId: productId,
            },
            headers: {'x-access-token': JSON.parse(localStorage.getItem("user")).accessToken},
        });
    }

    async getTotalProducts(userId) {
        return axios.get(API_URL + "getTotal?userId=" + userId, {
            headers: {'x-access-token': JSON.parse(localStorage.getItem("user")).accessToken},
        });
    }

    async getMostPopularProduct(userId) {
        return axios.get(API_URL + "getMostPopular?userId=" + userId, {
            headers: {'x-access-token': JSON.parse(localStorage.getItem("user")).accessToken},
        });
    }

    async getProductStats(userId) {
        return axios.get(API_URL + "getStats?userId=" + userId, {
            headers: {'x-access-token': JSON.parse(localStorage.getItem("user")).accessToken},
        });
    }
}

export default new ProductService();
