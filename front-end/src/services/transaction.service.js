import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL + "/api/transaction/";

class TransactionService {
    async addNewTransaction(transactionRating, productsPurchased, contactId, userId) {
        return axios.post(API_URL + "new", {
            transactionRating,
            productsPurchased,
            contactId,
            userId,
        }, {
            headers: {'x-access-token': JSON.parse(localStorage.getItem("user")).accessToken},
        });
    }

    async deleteTransaction(userId, transId) {
        return axios.delete(API_URL + "deleteOne", {
            data: {
                userId: userId,
                transactionId: transId,
            },
            headers: {'x-access-token': JSON.parse(localStorage.getItem("user")).accessToken},
        });
    }

    async getAllTransactions(userId) {
        return axios.get(API_URL + "getAll?userId=" + userId, {
            headers: {'x-access-token': JSON.parse(localStorage.getItem("user")).accessToken},
        });
    }

    async getSalesStats(userId) {
        return axios.get(API_URL + "getStats?userId=" + userId, {
            headers: {'x-access-token': JSON.parse(localStorage.getItem("user")).accessToken},
        });
    }

}

export default new TransactionService();
