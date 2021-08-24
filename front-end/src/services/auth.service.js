import axios from "axios";

const API_URL = "http://localhost:8080/api/auth/";

class AuthService {
  async login(email, password) {
    const response = await axios.post(API_URL + "signin", {
      email,
      password
    });

    if (response.data.accessToken) {
      localStorage.setItem("user", JSON.stringify(response.data));
    }
    
    return response.data;
  }

  logout() {
    localStorage.removeItem("user");
  }
    
  //TODO Add try catch stuff
  register(name, email, password) {
    return axios.post(API_URL + "signup", {
      name,
      email,
      password
    });
  }

  getCurrentUser() {
    return JSON.parse(localStorage.getItem('user'));;
  }
}

export default new AuthService();