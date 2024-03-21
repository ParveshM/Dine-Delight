import { Link, useLocation } from "react-router-dom";
import { logo } from "../../../assets/images";
import NavItem from "./NavItem";
import { NavbarItem } from "../../../constants";
import { useAppSelector } from "../../../redux/store/Store";
import { useEffect, useState } from "react";
import { ChevronDown, MapPin, Menu } from "lucide-react";
import LocationSidebar from "../Sidebar/LocationSidebar";
import { getAddressByReversedGeocode } from "../../../Api/reverseGeocode";
import { truncate } from "../../../utils/util";

const Navbar = () => {
  const [isNavOpen, setIsNavOpen] = useState<boolean>(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);
  const userName = useAppSelector((state) => state.UserSlice.name);
  const coordinates = useAppSelector(
    (state) => state.LocationSlice?.location?.coordinates
  ) as string[];

  const [locationDetails, setLocationDetails] = useState<string | null>(null);

  useEffect(() => {
    if (coordinates.length) {
      getAddressByReversedGeocode(coordinates[0], coordinates[1])
        .then((add) => {
          setLocationDetails(truncate(add));
        })
        .catch((error) => console.error(error));
    } else {
      setLocationDetails(null);
    }
  }, [coordinates[0]]);

  const handleSidebarOpen = () => {
    setIsSidebarOpen(!isSidebarOpen);
    setIsNavOpen(false);
  };
  const location = useLocation();

  return (
    <nav className="fixed top-0 left-0 right-0 z-[999] bg-white border-gray-200 dark:bg-gray-900 shadow-md rounded-md ">
      <div className=" max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <div className="flex items-center space-x-3 rtl:space-x-reverse">
          <Link to="/">
            <img src={logo} className="h-10" alt="Dine delight Logo" />
          </Link>
          {location.pathname === "/" && (
            <button
              className=" hover:text-orange-400 inline-flex items-center text-sm"
              onClick={handleSidebarOpen}
            >
              {locationDetails ? (
                <>
                  <p>{locationDetails}</p>
                  <ChevronDown />
                </>
              ) : (
                <MapPin />
              )}
            </button>
          )}
        </div>
        {isSidebarOpen && (
          <LocationSidebar handleSidebarOpen={handleSidebarOpen} />
        )}
        <div className="flex items-center md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
          <Menu
            className="inline-flex items-center cursor-pointer p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            onClick={() => {
              setIsNavOpen(!isNavOpen);
              setIsSidebarOpen(false);
            }}
          />
        </div>
        <div
          className={`items-center justify-between ${
            isNavOpen ? "block" : "hidden"
          } w-full md:flex md:w-auto md:order-1`}
        >
          <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
            {NavbarItem.map((item, index) => {
              return <NavItem to={item.to} label={item.label} key={index} />;
            })}
            {userName ? (
              <NavItem to="/user/profile" label={userName} />
            ) : (
              <NavItem to="/user/auth/login" label="Login" />
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
