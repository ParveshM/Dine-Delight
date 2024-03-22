import { logo } from "../../assets/images";
import { useAppDispatch, useAppSelector } from "../../redux/store/Store";
import { clearUser } from "../../redux/slices/UserSlice";
import logout from "../../utils/logout";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import SellerSideBar from "../../components/restaurant/sellerSidebar";
import { childrenProps } from "../../types/PropsType";

const SellerPage: React.FC<childrenProps> = ({ children }) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const handleLogout = () => {
    dispatch(clearUser());
    logout("Logout success");
    navigate("/restaurant/auth/login");
  };
  const [showSidebar, setShowSidebar] = useState<boolean>(true);
  const name = useAppSelector((state) => state.UserSlice.name);

  return (
    <>
      <nav className="fixed top-0  z-50 w-full bg-slate-50  shadow-md border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700">
        <div className="px-3 py-3 lg:px-5 lg:pl-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center justify-start rtl:justify-end">
              <button
                type="button"
                className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none  dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                onClick={() => setShowSidebar((curr) => !curr)}
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
              <Link to="/restaurant/dashboard" className="flex ms-2 md:me-24">
                <img src={logo} className="h-12 me-3" alt="Dine Delight Logo" />
                <span className="self-center text-xl font-semibold font-serif sm:text-2xl whitespace-nowrap dark:text-white invisible sm:visible">
                  {name}
                </span>
              </Link>
            </div>
          </div>
        </div>
      </nav>
      <div>
        <SellerSideBar handleLogout={handleLogout} showSidebar={showSidebar} />
        <div
          className={`p-5  mt-16 ${showSidebar ? "ml-20" : "ml-2"} md:ml-20`}
        >
          {children} {/** children nodes are rendered here dynamically*/}
        </div>
      </div>
    </>
  );
};
export default SellerPage;
