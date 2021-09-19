import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL + "/api/contact/";

class ContactService {
    async addNewCustomer(name, email, phoneNumber, companyName, description, userId) {
        console.log(name);
        return axios.post(API_URL + "new", {
            name: name,
            email: email,
            phoneNumber: phoneNumber,
            companyName: companyName,
            description: description,
            userId: userId
        });
        
    } 
}

export default new ContactService();
