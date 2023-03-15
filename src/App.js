import "./App.scss";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ROUTES } from "./routes";
import { Login, Register } from "./Pages/Public";
import {
  Dashboard,
  Inventory,
  Record,
  Request,
  SearchPage,
  Settings,
} from "./Pages/Private";
import ProtectedPages from "./utils/protectedPage";

const AppRoute = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={ROUTES.LOGIN} element={<Login />} />
        <Route path={ROUTES.REGISTER} element={<Register />} />
        <Route path={ROUTES.HOME} element={<Login />} />
        <Route element={<ProtectedPages />}>
          <Route path={ROUTES.DASHBOARD} element={<Dashboard />} />
          <Route path={ROUTES.RECORD} element={<Record />} />
          <Route path={ROUTES.INVENTORY} element={<Inventory />} />
          <Route path={ROUTES.SETTINGS} element={<Settings />} />
          <Route path={ROUTES.SEARCH} element={<SearchPage />} />
          <Route path={ROUTES.REQUEST + "/:id"} element={<Request />} />
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
