import axios from "axios";

// https://cromaclone.onrender.com/api/v1
// http://localhost:8000/api/v1

const axiosInstance = axios.create({
  baseURL: "http://localhost:8000/api/v1",
  withCredentials: true,
});

export default axiosInstance;
