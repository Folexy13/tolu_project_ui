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
  user_add_stock = async (data) => {
    try {
      const response = await api.post(`/add-stock`, data);
      return response;
    } catch (error) {
      return error;
    }
  };

  get_all_users = async (page) => {
    try {
      const response = await api.get(`/get/all-users?page=${page}`);
      return response;
    } catch (error) {
      return error;
    }
  };

  get_all_records = async (page) => {
    try {
      const response = page
        ? await api.get(`/get/all-records?page=${page}`)
        : await api.get(`/get/all-records`);
      return response;
    } catch (error) {
      return error;
    }
  };
  get_recent_records = async () => {
    try {
      const response = await api.get("/get/recent-records");
      return response;
    } catch (error) {
      return error;
    }
  };
  get_all_stocks = async (page) => {
    try {
      const response = page
        ? await api.get(`/get/all-stocks?page=${page}`)
        : await api.get(`/get/all-stocks`);
      return response;
    } catch (error) {
      return error;
    }
  };

  get_stock = async (id) => {
    try {
      const response = await api.get(`/get/stock/${id}`);
      return response;
    } catch (error) {
      return error;
    }
  };
  get_search_stock = async (page, stockName) => {
    try {
      const response = await api.get(`/search/${page}/?stockName=${stockName}`);
      return response;
    } catch (error) {
      return error;
    }
  };

  add_new_request = async (data) => {
    try {
      const response = await api.post(`/add-request`, data);
      return response;
    } catch (error) {
      return error;
    }
  };
  update_stock = async (data) => {
    try {
      const response = await api.post(`/update`, {
        id: data.id,
        type:data.type,
        field:data.field,
      });
      return response;
    } catch (error) {
      return error;
    }
  };
  update_status = async (data) => {
    try {
      const response = await api.post(`/update_v2`, {
        id: data.id,
        type:data.type,
        field:data.field,
      });
      return response;
    } catch (error) {
      return error;
    }
  };
  webhook = async () => {
    try {
      const response = await api.post(`/webhook`);
      return response;
    } catch (error) {
      return error;
    }
  };
  update_user = async(data) =>{
    try {
       const response = await api.post(`/update/me/${data.id}`,data);
      return response;
    } catch (error) {
      return error
    }
  }
}

const userOBJ = new USER();
export default userOBJ;
