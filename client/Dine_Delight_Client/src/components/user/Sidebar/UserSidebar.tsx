import { useState } from "react";
import { userSidebarItem } from "../../../constants";
import logout from "../../../utils/logout";
import UserSidebarList from "./UserSidebarList";
import { Link, useNavigate } from "react-router-dom";
import { LogOut, PanelRightOpen } from "lucide-react";
export interface UserSidbarProps {
  isSidebarOpen: boolean;
  setIsSidebarOpen: (isOpen: boolean) => void;
}
const UserSidebar: React.FC<UserSidbarProps> = ({
  isSidebarOpen,
  setIsSidebarOpen,
}) => {
  const [activeItem, setActiveItem] = useState<number | null>(null);
  const navigate = useNavigate();

  const handleItemClick = (index: number) => {
    setActiveItem(index);
    setIsSidebarOpen(false);
  };
  const handleLogout = () => {
    logout("Logged out successfully");
    navigate("/");
  };
  return (
    <>
      <aside
        className={`fixed top-2 left-0 z-10 w-64 h-screen pt-20 shadow-md
         bg-white border-r border-gray-200
         ${
           isSidebarOpen
             ? "translate-x-0"
             : "sm:-translate-x-0 -translate-x-full"
         }
         sm:translate-x-0 dark:bg-gray-800 dark:border-gray-700`}
      >
        <div className="h-full px-3 pb-4 overflow-y-auto bg-white dark:bg-gray-800">
          <div className="flex justify-center items-center gap-2">
            <h2 className="text-xl font-semibold">Account</h2>
            <PanelRightOpen
              className="md:hidden focus:outline-none cursor-pointer"
              onClick={() => setIsSidebarOpen(false)}
            />
          </div>
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
