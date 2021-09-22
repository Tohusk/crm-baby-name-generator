import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL + "/api/category/";

class CategoryService {
    // gets all categories given userId by querying backend
    async getAllCategories(userId) {
        return axios.get(API_URL + "getAll?userId=" + userId);
    }
}

export default new CategoryService();
