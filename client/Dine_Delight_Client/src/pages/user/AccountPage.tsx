import { useEffect, useState } from "react";
import { USER_API } from "../../constants";
import axiosJWT from "../../utils/axiosService";
import { useAppDispatch, useAppSelector } from "../../redux/store/Store";
import { clearUser } from "../../redux/slices/UserSlice";
import logout from "../../utils/logout";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/user/Header/Navbar";
import { childrenProps } from "../../types/PropsType";
import UserSidebar from "../../components/user/Sidebar/UserSidebar";

const AccountPage: React.FC<childrenProps> = ({ children }) => {
  const user = useAppSelector((state) => state.UserSlice);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    // axiosJWT
    //   .get(USER_API + "/")
    //   .then(({ data }) => {
    //     setMessage(data);
    //   })
    //   .catch(({ response }) => {
    //     console.log(response);
    //     setMessage(response?.data?.message);
    //   });
  }, []);

  const handleLogout = () => {
    dispatch(clearUser());
    logout("Logout success");
    navigate("/user/auth/login");
  };

  return (
    <>
      <Navbar />
      <div>
        <UserSidebar />
        <div className="p-4 mt-10 sm:ml-64">{children}</div>
      </div>
    </>
  );
};
export default AccountPage;
