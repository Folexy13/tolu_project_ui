import { Navigate, Outlet } from "react-router-dom";
import { toast } from "react-toastify";
import { getStoredAuthToken } from ".";
import { ROUTES } from "../routes";
// console.log("token is", getStoredAuthToken());

const parseJwt = (token) => {
  try {
    return JSON.parse(atob(token.split(".")[1]));
  } catch (e) {
    return null;
  }
};
const decodedJwt = parseJwt(getStoredAuthToken());
const ProtectedPages = () => {
  let isAuth = false;
  try {
    if (decodedJwt) {
      const tokenIsExpired = decodedJwt.exp * 1000 < Date.now();
      isAuth = getStoredAuthToken() && !tokenIsExpired;
      if (!isAuth) {
        toast.error("Token expired- Login first");
      }
    }
  } catch (e) {
    console.log("error", e);
  }
  console.log(isAuth);
  return isAuth ? <Outlet /> : <Navigate to={ROUTES.LOGIN} />;
};

export default ProtectedPages;
