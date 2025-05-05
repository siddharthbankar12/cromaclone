import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://cromaclone.onrender.com/api/v1",
  // https://cromaclone.onrender.com/api/v1
  // http://localhost:8000/api/v1
  withCredentials: true,
});

export default axiosInstance;
