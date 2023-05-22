import axios from "axios";
import { toast } from "react-toastify";
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

api.interceptors.response.use(
  (response) => {
    return response;
  },
  async function (error) {
    console.log(error)
    const access_token = JSON.parse(localStorage.getItem("auth") || 'null')?.access_token;
    if(error.response.status === 500 || error.response.status === 403 && access_token) {
      const decodedJwt = parseJwt(access_token);
      if (decodedJwt.exp * 1000 < Date.now()) {
        localStorage.removeItem("persist:jogosSerios")
        localStorage.removeItem("auth")
        window.location.reload()
        return Promise.reject(new Error('Sua sessão expirou, por favor acesse novamente sua conta para atualizar suas credenciais'));
      }
    }

    if(error.response.data.message) {
      toast.error(error.response.data.message);
    }
    return Promise.reject(error);
  }
);

const parseJwt = (token: string) => {
  try {
    return JSON.parse(atob(token.split(".")[1]));
  } catch (e) {
    return null;
  }
};