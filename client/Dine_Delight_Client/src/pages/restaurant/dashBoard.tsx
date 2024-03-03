import { useAppDispatch } from "../../redux/store/Store";
import { clearUser } from "../../redux/UserSlice";
import logout from "../../utils/logout";
import { useNavigate } from "react-router-dom";
const Dashboard: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const handleLogout = () => {
    dispatch(clearUser());
    logout("Logout success");
    navigate("/restaurant/auth/login");
  };
  return (
    <div className="flex justify-center gap-3 items-center">
      <div className="flex-col ">
        <h1 className="">Restaurant Dashboard</h1>
        <button
          className="bg-yellow-500 border tex-white font-semibold py-2 px-3 rounded-lg text-center"
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>
    </div>
  );
};
export default Dashboard;
