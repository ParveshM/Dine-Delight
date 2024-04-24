import { childrenProps } from "../../types/PropsType";
import Header from "../../components/Admin/Header&Sidebar/Header";
import Sidebar from "../../components/Admin/Header&Sidebar/Sidebar";
import { useState } from "react";

const AdminPage: React.FC<childrenProps> = ({ children }) => {
  const [showSidebar, setShowSidebar] = useState<boolean>(false);
  return (
    <>
      <Header isSidebarOpen={() => setShowSidebar((curr) => !curr)} />
      <div>
        <Sidebar
          isSidebarOpen={showSidebar}
          setIsSidebarOpen={setShowSidebar}
        />
        <div className="  p-4 mt-14 sm:ml-64">{children}</div>
      </div>
    </>
  );
};

export default AdminPage;
