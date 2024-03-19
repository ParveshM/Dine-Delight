import { FC } from "react";
import { useAppSelector } from "../redux/store/Store";
import { Navigate, Outlet } from "react-router-dom";

const PublicRoute: FC = () => {
  const { isAuthenticated, role } = useAppSelector((state) => state.UserSlice);
  if (role === "user") {
    return isAuthenticated ? <Navigate to={"/"} replace /> : <Outlet />;
  } else if (role === "seller") {
    return isAuthenticated ? (
      <Navigate to={"/restaurant/dashboard"} replace />
    ) : (
      <Outlet />
    );
  } else if (role === "admin") {
    return isAuthenticated ? (
      <Navigate to={"/admin/dashboard"} replace />
    ) : (
      <Outlet />
    );
  }
  return <Outlet />; // if user has no role and not authenticated return the routes
};

export default PublicRoute;
