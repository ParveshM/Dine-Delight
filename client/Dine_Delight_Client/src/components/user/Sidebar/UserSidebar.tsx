import { useState } from "react";
import { userSidebarItem } from "../../../constants";
import logout from "../../../utils/logout";
import UserSidebarList from "./UserSidebarList";
import { Link, useNavigate } from "react-router-dom";
import { LogOut } from "lucide-react";

const UserSidebar = () => {
  const [activeItem, setActiveItem] = useState<number | null>(null);
  const navigate = useNavigate();

  const handleItemClick = (index: number) => setActiveItem(index);
  const handleLogout = () => {
    console.log("slkfdjslkjf");
    logout("Logged out successfully");
    navigate("/");
  };
  return (
    <>
      <button
        data-drawer-target="default-sidebar"
        data-drawer-toggle="default-sidebar"
        aria-controls="default-sidebar"
        type="button"
        className="inline-flex items-center p-2 mt-2 ms-3 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
      >
        <span className="sr-only">Open sidebar</span>
        <svg
          className="w-6 h-6"
          aria-hidden="true"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            clipRule="evenodd"
            fillRule="evenodd"
            d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
          ></path>
        </svg>
      </button>

      <aside
        id="logo-sidebar"
        className="fixed top-2  left-0 w-64 h-screen pt-20 shadow-md  transition-transform -translate-x-full bg-white border-r border-gray-200 sm:translate-x-0 dark:bg-gray-800 dark:border-gray-700"
        aria-label="Sidebar"
      >
        <div className="h-full px-3 pb-4 overflow-y-auto bg-white dark:bg-gray-800">
          <h1 className="pl-7 text-2xl font-bold text-gray-800 dark:text-white">
            Account
          </h1>
          <hr className="my-2 text-black" />
          <ul className="space-y-2 font-medium">
            {userSidebarItem.map((item, index) => (
              <UserSidebarList
                {...item}
                key={index}
                handleClick={() => handleItemClick(index)}
                isActive={activeItem === index}
                {...(item.text === "Logout" ? handleLogout : {})}
              />
            ))}
            <li>
              <Link
                to="#"
                onClick={handleLogout}
                className={`flex items-center p-3 text-black rounded-lg hover:bg-gray-200  group`}
              >
                <LogOut className="w-5 h-5 mr-3 text-black group-hover:text-black dark:text-gray-300 dark:group-hover:text-gray-100" />
                <span className="ms-3 font-medium">Logout</span>
              </Link>
            </li>
          </ul>
        </div>
      </aside>
    </>
  );
};

export default UserSidebar;
