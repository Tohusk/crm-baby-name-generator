import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL + "/api/category/";

class CategoryService {
    // gets all categories given userId by querying backend
    async getAllCategories(userId) {
        return axios.get(API_URL + "getAll?userId=" + userId);
    }

    async getOneCategory(userId, categoryId) {
        return axios.get(API_URL + "get?userId=" + userId + "&categoryId=" + categoryId);
    }

    async addNewCategory(name, colour, userId) {
        return axios.post(API_URL + "new", {
            userId,
            name,
            colour,
        });
    }

    async deleteCategory(userId, categoryId) {
        return axios.delete(API_URL + "deleteOne", {
            data: {
                userId: userId,
                categoryId: categoryId,
            },
        });
    }
}

export default new CategoryService();
