import { Link } from "react-router-dom";
import { logo } from "../../../assets/images";
import NavItem from "./NavItem";
import { NavbarItem } from "../../../constants";
import { useAppSelector } from "../../../redux/store/Store";
const Navbar = () => {
  const userName = useAppSelector((state) => state.UserSlice.name);
  return (
    <nav className="fixed top-0 left-0 right-0 z-[999] bg-white border-gray-200 dark:bg-gray-900 shadow-md rounded-md ">
      <div className=" max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <Link
          to="/"
          className="flex items-center space-x-3 rtl:space-x-reverse"
        >
          <img src={logo} className="h-10" alt="Dine delight Logo" />
        </Link>
        <div className="flex items-center md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
          <button
            data-collapse-toggle="navbar-user"
            type="button"
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            aria-controls="navbar-user"
            aria-expanded="false"
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className="w-5 h-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 17 14"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M1 1h15M1 7h15M1 13h15"
              />
            </svg>
          </button>
        </div>
        <div
          className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1"
          id="navbar-user"
        >
          <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
            {NavbarItem.map((item, index) => {
              return <NavItem to={item.to} label={item.label} key={index} />;
            })}
            {userName ? (
              <NavItem to="/user/profile" label={userName} />
            ) : (
              <NavItem to="user/auth/login" label="Login" />
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
