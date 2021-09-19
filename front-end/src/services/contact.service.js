import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL + "/api/contact/";

class ContactService {
    async addNewCustomer(name, email, phoneNumber, companyName, description, userId) {
        console.log("posting in axios")
        return axios.post(API_URL + "new", {
            name,
            email,
            phoneNumber,
            companyName,
            description,
            userId
        });
    } 
}

export default new ContactService();
