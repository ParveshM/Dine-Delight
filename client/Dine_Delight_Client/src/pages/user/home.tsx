import { useEffect, useState } from "react";
import { USER_API } from "../../constants";
import axiosJWT from "../../utils/axiosService";
import { useAppDispatch, useAppSelector } from "../../redux/store/Store";
import { clearUser } from "../../redux/UserSlice";
import logout from "../../utils/logout";
import { useNavigate } from "react-router-dom";

const Home: React.FC = () => {
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
    navigate("/user/login");
  };

  return (
    <>
      <h1>
        Name : {user.name} , message :{message}
      </h1>
      <button className="bg-yellow border" onClick={handleLogout}>
        Logout
      </button>
    </>
  );
};
export default Home;
