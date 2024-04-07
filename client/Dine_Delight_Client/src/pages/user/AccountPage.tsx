import Navbar from "../../components/user/Header/Navbar";
import { childrenProps } from "../../types/PropsType";
import UserSidebar from "../../components/user/Sidebar/UserSidebar";
import { useState } from "react";
import { PanelRightClose } from "lucide-react";

const AccountPage: React.FC<childrenProps> = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(true);
  return (
    <>
      <Navbar />
      <div>
        <UserSidebar
          isSidebarOpen={isSidebarOpen}
          setIsSidebarOpen={setIsSidebarOpen}
        />

        <div className="relative p-4 mt-10 sm:mt-20 sm:ml-64">
          <PanelRightClose
            className="absolute top-10 md:hidden left-1 focus:outline-none cursor-pointer"
            onClick={() => setIsSidebarOpen(true)}
          />

          {children}
        </div>
      </div>
    </>
  );
};
export default AccountPage;
