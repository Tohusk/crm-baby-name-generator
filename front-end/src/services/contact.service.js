import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL + "/api/contact/";

class ContactService {
    async addNewCustomer(name, email, phoneNumber, companyName, description, userId) {
        return axios.post(API_URL + "new", {
            name,
            email,
            phoneNumber,
            companyName,
            description,
            userId,
        });
    }

    async updateCustomer(name, email, phoneNumber, companyName, description, userId, contactId) {
        return axios.post(API_URL + "update", {
            name,
            email,
            phoneNumber,
            companyName,
            description,
            userId,
            contactId,
        });
    }

    async deleteCustomer(userId, contactId) {
        return axios.delete(API_URL + "deleteOne", {
            data: {
                userId: userId,
                contactId: contactId,
            },
        });
    }

    // contact routes to specify get, contact controller for get?userId
    async getOneCustomer(userId, contactId) {
        return axios.get(API_URL + "get?userId=" + userId + "&contactId=" + contactId);
    }

    async getAllCustomers(userId) {
        return axios.get(API_URL + "getAll?userId=" + userId);
    }
}

export default new ContactService();
