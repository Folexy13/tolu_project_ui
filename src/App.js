import "./App.scss";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ROUTES } from "./routes";
import { Login, Register } from "./Pages/Public";
import { Dashboard, Inventory, Record } from "./Pages/Private";
import { getStoredAuthToken } from "./utils";
import ProtectedPages from "./utils/protectedPage";
const parseJwt = (token) => {
  try {
    return JSON.parse(atob(token.split(".")[1]));
  } catch (e) {
    return null;
  }
};
const decodedJwt = parseJwt(getStoredAuthToken());
const isLoggedIn = getStoredAuthToken() && decodedJwt.exp * 1000 > Date.now();

const AppRoute = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={ROUTES.LOGIN} element={<Login />} />
        <Route path={ROUTES.REGISTER} element={<Register />} />
        <Route path={ROUTES.HOME} element={<Dashboard />} />
        <Route element={<ProtectedPages />}>
          <Route path={ROUTES.DASHBOARD} element={<Dashboard />} />
          <Route path={ROUTES.RECORD} element={<Record />} />
          <Route path={ROUTES.INVENTORY} element={<Inventory />} />
        </Route>
        <Route path="/*" element={<div>Error Page - Public</div>} />
      </Routes>
    </BrowserRouter>
  );
};
function App() {
  return <AppRoute />;
}

export default App;
