import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:8000/api/v1",
  // https://cromaclonebackend.onrender.com
  // http://localhost:8000/api/v1
  withCredentials: true,
});

export default axiosInstance;
