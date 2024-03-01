import { FC, ReactNode } from "react";
import { useAppSelector } from "../redux/store/Store";
import { Navigate, Route } from "react-router-dom";

type props = {
  element: ReactNode;
  path: string;
};
const ProtectedRoute: FC<props> = ({ path, element }) => {
  const user = useAppSelector((state) => state.UserSlice);
  console.log(user);

  return user.isAuthenticated ? (
    <Route path={path} element={element} />
  ) : (
    <Navigate to={"/user/login"} replace />
  );
};
export default ProtectedRoute;
