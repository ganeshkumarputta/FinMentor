import axios from "axios";

const API = axios.create({
  baseURL: "https://finmentor-3b7y.onrender.com"
});

export default API;