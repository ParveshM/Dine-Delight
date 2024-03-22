import { useEffect, useState } from "react";
import { USER_API } from "../../constants";
import axiosJWT from "../../utils/axiosService";
import { useAppDispatch, useAppSelector } from "../../redux/store/Store";
import { clearUser } from "../../redux/slices/UserSlice";
import logout from "../../utils/logout";
import { useNavigate } from "react-router-dom";

const Profile: React.FC = () => {
  const user = useAppSelector((state) => state.UserSlice);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [message, setMessage] = useState("");

  useEffect(() => {
    axiosJWT
      .get(USER_API + "/test")
      .then(({ data }) => {
        setMessage(data);
      })
      .catch(({ response }) => {
        console.log(response);
        setMessage(response?.data?.message);
      });
  }, []);

  const handleLogout = () => {
    dispatch(clearUser());
    logout("Logout success");
    navigate("/user/auth/login");
  };

  return (
    <>
      <h1>
        Name : {user.name} , message :{message}
      </h1>
      <button
        className="bg-yellow-500 border tex-white font-semibold py-2 px-3 rounded-lg text-center"
        onClick={handleLogout}
      >
        Logout
      </button>
    </>
  );
};
export default Profile;
