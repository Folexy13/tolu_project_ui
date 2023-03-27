import axios from "axios";
import { getStoredAuthToken, removeStoredAuthToken } from "../utils";

const baseurl = "https://tolu-api.onrender.com";

// const baseurl = "http://localhost:4000"; //localhost
const api = axios.create({
  baseURL: `${baseurl}/api/v1/`,
});
api.interceptors.request.use(
  (request) => {
    request.headers = {
      // "Content-Type": "application/json",
      Authorization: getStoredAuthToken()
        ? `Bearer ${getStoredAuthToken()}`
        : "",
    };
    return request;
  },
  (error) => {
    console.log("App can't make a request");
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => {
    // console.log("response received");
    if (response?.data?.token) {
      response.headers = {
        // "Content-Type": "application/json",
        Authorization: getStoredAuthToken()
          ? `Bearer ${getStoredAuthToken()}`
          : "",
      };
      // console.log(response.data.token);
    }
    return response.data;
  },
  (error) => {
    if (error?.response?.data?.authStatus === 403) {
      removeStoredAuthToken();
      window.location.assign("/");
    }
    return Promise.reject(error);
  }
);

export default api;
