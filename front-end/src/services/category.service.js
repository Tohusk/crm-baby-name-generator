import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL + "/api/category/";

class CategoryService {
    // gets all categories given userId by querying backend
    async getAllCategories(userId) {
        return axios.get(API_URL + "getAll?userId=" + userId);
    }

    async addNewCategory(name, userId) {
        //TODO change so not always white
        const colour = "ffffff"
        return axios.post(API_URL + "new", {
            userId,
            name,
            colour
        });
    }
}

export default new CategoryService();
