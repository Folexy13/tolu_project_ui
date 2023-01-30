import api from "../API";
import { removeStoredAuthToken, storeAuthToken } from "../utils";

class USER {
  //login user
  user_login = async (data) => {
    try {
      const response = await api.post("/user/login", data);
      if (response?.status && response.token) {
        removeStoredAuthToken();
        storeAuthToken(response.token);
        return response;
      } else {
        return response;
      }
    } catch (error) {
      console.log("error", error);
      return error;
    }
  };
  //signup new user
  user_signup = async (data) => {
    console.log(data);
    try {
      const response = await api.post("/user/signup", data);
      if (response?.status) {
        storeAuthToken(response.token);
        return response;
      }
    } catch (error) {
      return error;
    }
  };
  user_reset = async (data) => {
    try {
      const response = await api.post("/user/reset-password", data);
      return response;
    } catch (error) {
      return error;
    }
  };
  user_change_password = async (data, token) => {
    try {
      const response = await api.put(
        `/user/reset-password?token=${token}`,
        data
      );
      return response;
    } catch (error) {
      return error;
    }
  };
  user_verify_account = async (data) => {
    try {
      const response = await api.post(`/user/verify-account`, data);
      return response;
    } catch (error) {
      return error;
    }
  };
}

const userOBJ = new USER();
export default userOBJ;
