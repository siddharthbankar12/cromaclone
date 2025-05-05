import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://cromaclone.onrender.com",
  // https://cromaclone.onrender.com
  // http://localhost:8000/api/v1
  withCredentials: true,
});

export default axiosInstance;
