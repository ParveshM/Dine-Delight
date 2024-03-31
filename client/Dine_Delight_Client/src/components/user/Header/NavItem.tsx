import { Link } from "react-router-dom";
type NavItemType = {
  to: string;
  label: string;
};
const NavItem: React.FC<NavItemType> = ({ to, label }) => {
  return (
    <li className="relative">
      <Link
        to={to}
        className="block text-orange-400 font-medium group py-2 px-3 transition duration-300  rounded hover:bg-gray-100 md:hover:bg-transparent  md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
      >
        {label}
        <span className="block max-w-0 group-hover:max-w-full transition-all duration-500 h-0.5 bg-orange-500"></span>
      </Link>
    </li>
  );
};

export default NavItem;
