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
}

export default new ProductService();
