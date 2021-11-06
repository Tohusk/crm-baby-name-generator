import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL + "/api/contact/";

class ContactService {
    async addNewContact(name, email, phoneNumber, companyName, description, userId) {
        return axios.post(API_URL + "new", {
            name,
            email,
            phoneNumber,
            companyName,
            description,
            userId,
        }, {
            headers: {'x-access-token': JSON.parse(localStorage.getItem("user")).accessToken},
        });
    }

    async updateContact(name, email, phoneNumber, companyName, description, userId, contactId) {
        return axios.post(API_URL + "update", {
            name,
            email,
            phoneNumber,
            companyName,
            description,
            userId,
            contactId,
        }, {
            headers: {'x-access-token': JSON.parse(localStorage.getItem("user")).accessToken},
        });
    }

    async deleteContact(userId, contactId) {
        return axios.delete(API_URL + "deleteOne", {
            data: {
                userId: userId,
                contactId: contactId,
            },
            headers: {'x-access-token': JSON.parse(localStorage.getItem("user")).accessToken},
        });
    }

    // contact routes to specify get, contact controller for get?userId
    async getOneContact(userId, contactId) {
        return axios.get(API_URL + "get?userId=" + userId + "&contactId=" + contactId,{
            headers: {'x-access-token': JSON.parse(localStorage.getItem("user")).accessToken},
        });
    }

    async getAllContacts(userId) {
        return axios.get(API_URL + "getAll?userId=" + userId,{
            headers: {'x-access-token': JSON.parse(localStorage.getItem("user")).accessToken},
        });
    }

    async getContactStatistics(userId, contactId) {
        return axios.get(API_URL + "getContactStatistics?contactId=" + contactId + "&userId=" + userId,{
            headers: {'x-access-token': JSON.parse(localStorage.getItem("user")).accessToken},
        });
    }

    async getUserAvgRating(userId) {
        return axios.get(API_URL + "getUserAvgRating?userId=" + userId,{
            headers: {'x-access-token': JSON.parse(localStorage.getItem("user")).accessToken},
        });
    }
}

export default new ContactService();
