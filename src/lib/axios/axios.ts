import axios from "axios";
import { getToken } from "../../service/authService";
import { BASE_URL } from "../../util/constants";

export const api = axios.create({
  baseURL: BASE_URL
})

// Add a request interceptor
api.interceptors.request.use(
  config => {
    const token = getToken()
    
    if (token) {
      config.headers['Authorization'] = 'Bearer ' + token
    }
    
    config.headers['Content-Type'] = 'application/json';  
    return config
  },
  error => {
    Promise.reject(error)
  }
)
