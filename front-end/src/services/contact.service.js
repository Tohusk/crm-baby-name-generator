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

    // contact routes to specify get, contact controller for get?userId
    async getOneCustomer(userId, contactId){
        return axios.get(API_URL + "get?userId=" + userId + "&contactId=" + contactId)
    }
}



export default new ContactService();
