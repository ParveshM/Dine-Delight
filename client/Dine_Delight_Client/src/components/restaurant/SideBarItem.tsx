import { FC, useState } from "react";
import { Link } from "react-router-dom";
import { SidebarItemInterface } from "../../types/PropsType";

const SidebarItem: FC<SidebarItemInterface> = ({
  to,
  Icon,
  text,
  isActive,
  handleClick,
  handleLogout,
}) => {
  const [isHovered, setIshovered] = useState<boolean>(false);
  return (
    <li>
      <Link
        to={to}
        className={`flex justify-center p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 ${
          isActive ? "bg-gray-100 dark:bg-gray-800" : ""
        }`}
        onClick={handleClick}
        onMouseEnter={() => setIshovered(true)}
        onMouseLeave={() => setIshovered(false)}
      >
        <Icon className="w-6 h-6" color="#F49B33" onClick={handleLogout} />
        <div
          className={` 
          absolute left-full rounded-md px-2 py-1 ml-6
          bg-orange-100 text-orange-800 text-sm ${
            !isHovered
              ? "invisible opacity-20"
              : "visible opacity-100 translate-x-0"
          }
          -translate-x-3 transition-all
      `}
        >
          {text}
        </div>
      </Link>
    </li>
  );
};

export default SidebarItem;
