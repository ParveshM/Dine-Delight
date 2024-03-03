import { FC } from "react";
import { useAppSelector } from "../redux/store/Store";
import { Navigate, Outlet } from "react-router-dom";

const PubliceRoute: FC = () => {
  const { isAuthenticated } = useAppSelector((state) => state.UserSlice);

  return isAuthenticated ? (
    <Navigate to={"/user/profile"} replace />
  ) : (
    <Outlet />
  );
};

export const SellerPublicRoute: FC = () => {
  const { isAuthenticated } = useAppSelector((state) => state.UserSlice);

  return isAuthenticated ? (
    <Navigate to={"/restaurant/dashboard"} replace />
  ) : (
    <Outlet />
  );
};

export const AdminPublicRoute: FC = () => {
  const { isAuthenticated } = useAppSelector((state) => state.UserSlice);

  return isAuthenticated ? <Navigate to={"/admin/"} replace /> : <Outlet />;
};

export default PubliceRoute;
