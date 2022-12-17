import axios from "axios"
import store from "./store/index.js";

const axiosClient = axios.create({
    baseURL: 'http://survey:87/api/',
})

axiosClient.interceptors.request.use(config => {
    config.headers.Authorization = `Bearer ${store.state.user.token}`;
    return config;
})

export default axiosClient
