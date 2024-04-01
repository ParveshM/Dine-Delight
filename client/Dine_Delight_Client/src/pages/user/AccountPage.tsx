import Navbar from "../../components/user/Header/Navbar";
import { childrenProps } from "../../types/PropsType";
import UserSidebar from "../../components/user/Sidebar/UserSidebar";

const AccountPage: React.FC<childrenProps> = ({ children }) => {
  return (
    <>
      <Navbar />
      <div>
        <UserSidebar />
        <div className="p-4 mt-10 sm:mt-20 sm:ml-64">{children}</div>
      </div>
    </>
  );
};
export default AccountPage;
