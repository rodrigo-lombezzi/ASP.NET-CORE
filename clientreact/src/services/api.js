import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:5012",
})

export default api;