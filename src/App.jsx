import { Navigate, Route, Routes } from "react-router-dom";

import DefaultLayout from "./layouts/DefaultLayout";
import AuthLayout from "./layouts/AuthLayout";
import useAuthStore from "./hooks/auth";

import HomePage from "./pages/HomePage";

import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";

const App = () => {
  const isAuthenticated = useAuthStore(
    ({ isAuthenticated }) => isAuthenticated
  );

  return (
    <Routes>
      <Route element={<DefaultLayout isAllowed={isAuthenticated}/>}>
        <Route index element={<HomePage />} />
      </Route>

      <Route element={<AuthLayout />}>
        <Route path="login" element={<LoginPage />} />
        <Route path="register" element={<RegisterPage />} />
      </Route>

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default App;
