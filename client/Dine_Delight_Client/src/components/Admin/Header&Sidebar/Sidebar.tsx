import { Link, useNavigate } from "react-router-dom";
import { Utensils, Images, ListPlus } from "lucide-react";
import logout from "../../../utils/logout";
import { useAppDispatch } from "../../../redux/store/Store";
import { clearUser } from "../../../redux/slices/UserSlice";
import { UserSidbarProps } from "../../user/Sidebar/UserSidebar";

const Sidebar: React.FC<UserSidbarProps> = ({
  isSidebarOpen,
  setIsSidebarOpen,
}) => {
  const dispatch = useAppDispatch();
  const handleLogout = () => {
    dispatch(clearUser());
    logout("Logout success");
    navigate("/admin/auth/login");
  };
  const navigate = useNavigate();
  const handleClick = () => {
    setIsSidebarOpen(false);
  };
  return (
    <aside
      id="logo-sidebar"
      className={`fixed  top-0 left-0 z-10  w-64 h-screen pt-20 
      ${
        isSidebarOpen ? "translate-x-0" : "sm:-translate-x-0 -translate-x-full"
      } sm:translate-x-0
       bg-white border-r border-gray-200  dark:bg-gray-800 dark:border-gray-700`}
    >
      <div className="h-full px-3 pb-4 overflow-y-auto bg-white dark:bg-gray-800">
        <ul className="space-y-2 font-medium">
          <li>
            <Link
              to={"/admin/dashboard"}
              className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
            >
              <svg
                className="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 22 21"
              >
                <path d="M16.975 11H10V4.025a1 1 0 0 0-1.066-.998 8.5 8.5 0 1 0 9.039 9.039.999.999 0 0 0-1-1.066h.002Z" />
                <path d="M12.5 0c-.157 0-.311.01-.565.027A1 1 0 0 0 11 1.02V10h8.975a1 1 0 0 0 1-.935c.013-.188.028-.374.028-.565A8.51 8.51 0 0 0 12.5 0Z" />
              </svg>
              <span className="ms-3">Dashboard</span>
            </Link>
          </li>
          <li>
            <Link
              to="/admin/users"
              onClick={handleClick}
              className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
            >
              <svg
                className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 20 18"
              >
                <path d="M14 2a3.963 3.963 0 0 0-1.4.267 6.439 6.439 0 0 1-1.331 6.638A4 4 0 1 0 14 2Zm1 9h-1.264A6.957 6.957 0 0 1 15 15v2a2.97 2.97 0 0 1-.184 1H19a1 1 0 0 0 1-1v-1a5.006 5.006 0 0 0-5-5ZM6.5 9a4.5 4.5 0 1 0 0-9 4.5 4.5 0 0 0 0 9ZM8 10H5a5.006 5.006 0 0 0-5 5v2a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-2a5.006 5.006 0 0 0-5-5Z" />
              </svg>
              <span className="flex-1 ms-3 whitespace-nowrap">Users</span>
            </Link>
          </li>
          <li>
            <Link
              to="/admin/restaurants"
              onClick={handleClick}
              className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
            >
              <Utensils
                className="text-gray-500 group-hover:text-gray-900"
                strokeWidth={3}
                absoluteStrokeWidth
              />
              <span className="flex-1 ms-3 whitespace-nowrap">Restaurants</span>
            </Link>
          </li>
          <li>
            <Link
              to="/admin/new_registrations"
              onClick={handleClick}
              className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
            >
              <ListPlus
                className="text-gray-500 group-hover:text-gray-900"
                strokeWidth={3}
                absoluteStrokeWidth
              />
              <span className="flex-1 ms-3 whitespace-nowrap">
                New Registrations
              </span>
            </Link>
          </li>

          <li>
            <Link
              to="/admin/banners"
              onClick={handleClick}
              className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
            >
              <Images
                className="text-gray-500 group-hover:text-gray-900"
                strokeWidth={3}
                absoluteStrokeWidth
              />
              <span className="flex-1 ms-3 whitespace-nowrap">Banners</span>
            </Link>
          </li>
          <li onClick={handleLogout} className="cursor-pointer">
            <a className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
              <svg
                className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 18 16"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M1 8h11m0 0L8 4m4 4-4 4m4-11h3a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-3"
                />
              </svg>
              <span className="flex-1 ms-3 whitespace-nowrap">Sign out </span>
            </a>
          </li>
        </ul>
      </div>
    </aside>
  );
};
export default Sidebar;
