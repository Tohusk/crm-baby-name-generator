import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL + "/api/category/";

class CategoryService {
    async getAllCategories(userId) {
        return axios.get(API_URL + "getAll?userId=" + userId, {
            headers: {'x-access-token': JSON.parse(localStorage.getItem("user")).accessToken},
        });
    }

    async getOneCategory(userId, categoryId) {
        return axios.get(API_URL + "get?userId=" + userId + "&categoryId=" + categoryId, {
            headers: {'x-access-token': JSON.parse(localStorage.getItem("user")).accessToken},
        });
    }

    async addNewCategory(name, colour, userId) {
        return axios.post(API_URL + "new", {
            userId,
            name,
            colour,
        }, {
            headers: {'x-access-token': JSON.parse(localStorage.getItem("user")).accessToken},
        });
    }

    async deleteCategory(userId, categoryId) {
        return axios.delete(API_URL + "deleteOne", {
            data: {
                userId: userId,
                categoryId: categoryId,
            },
            headers: {'x-access-token': JSON.parse(localStorage.getItem("user")).accessToken},
        });
    }
}

export default new CategoryService();
