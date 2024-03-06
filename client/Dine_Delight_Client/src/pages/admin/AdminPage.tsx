import { FC } from "react";
import { childrenProps } from "../../types/PropsType";
import Header from "../../components/Admin/Header&Sidebar/Header";
import Sidebar from "../../components/Admin/Header&Sidebar/Sidebar";

const AdminPage: FC<childrenProps> = ({ children }) => {
  return (
    <>
      <Header />
      <div>
        <Sidebar />
        <div className="p-4 mt-14 sm:ml-64">{children}</div>
      </div>
    </>
  );
};

export default AdminPage;
