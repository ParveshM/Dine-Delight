import { Link } from "react-router-dom";
import { SidebarItemInterface } from "../../../types/PropsType";
const UserSidebarList: React.FC<SidebarItemInterface> = ({
  to,
  Icon,
  text,
  isActive,
  handleClick,
}) => {
  return (
    <li>
      <Link
        to={to}
        onClick={handleClick}
        className={`flex items-center p-3 text-black rounded-lg   ${
          isActive && "bg-gray-200"
        } hover:bg-gray-200  group`}
      >
        <Icon className="w-5 h-5 mr-3 text-black group-hover:text-black dark:text-gray-300 dark:group-hover:text-gray-100" />
        <span className="ms-3 font-medium">{text}</span>
      </Link>
    </li>
  );
};

export default UserSidebarList;
