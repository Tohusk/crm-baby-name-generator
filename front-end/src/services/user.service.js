import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL + "/api/user/";

class UserService {
    async login(email, password) {
        const response = await axios.post(API_URL + "signin", {
            email,
            password,
        });

        if (response.data.accessToken) {
            localStorage.setItem("user", JSON.stringify(response.data));
        }

        return response.data;
    }

    logout() {
        localStorage.removeItem("user");
    }

    register(name, email, companyName, password) {
        return axios.post(API_URL + "signup", {
            name,
            email,
            companyName,
            password,
        });
    }

    getCurrentUser() {
        return JSON.parse(localStorage.getItem("user"));
    }
}

export default new UserService();
