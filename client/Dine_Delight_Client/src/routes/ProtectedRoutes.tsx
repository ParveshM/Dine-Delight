import { FC } from "react";
import { useAppSelector } from "../redux/store/Store";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute: FC = () => {
  const { isAuthenticated, role } = useAppSelector((state) => state.UserSlice);

  return isAuthenticated && role === "user" ? (
    <Outlet />
  ) : (
    <Navigate to={"/user/auth/login"} replace />
  );
};

export const SellerProtectedRoute: FC = () => {
  const { isAuthenticated, role } = useAppSelector((state) => state.UserSlice);

  return isAuthenticated && role === "seller" ? (
    <Outlet />
  ) : (
    <Navigate to={"/restaurant/auth/login"} replace />
  );
};

export const AdminProtectedRoute: FC = () => {
  const { isAuthenticated, role } = useAppSelector((state) => state.UserSlice);

  return isAuthenticated && role === "admin" ? (
    <Outlet />
  ) : (
    <Navigate to={"/admin/auth/login"} replace />
  );
};

export default ProtectedRoute;
