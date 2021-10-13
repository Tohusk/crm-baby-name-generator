import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL + "/api/transaction/";

class TransactionService {
    async addNewTransaction(total, transactionRating, productsPurchased, contactId, userId) {
        return axios.post(API_URL + "new", {
            total,
            transactionRating,
            productsPurchased,
            contactId,
            userId,
        });
    }
}

export default new TransactionService();