import { FC, useState } from "react";
import { SidebarProps } from "../../types/PropsType";
import SidebarItem from "./SideBarItem";
import { sidebarItem } from "../../constants";

const SellerSideBar: FC<SidebarProps> = ({ showSidebar, handleLogout }) => {
  const [activeItem, setActiveItem] = useState<number | null>(null);
  const handleItemClick = (index: number) => setActiveItem(index);

  return (
    <aside
      id="logo-sidebar"
      className={`fixed top-0 left-0 z-10 w-20 h-screen pt-20 transition-transform bg-white border-r border-gray-200 ${
        showSidebar ? "translate-x-0" : "sm:-translate-x-0 -translate-x-full"
      } sm:translate-x-0 dark:bg-gray-800 dark:border-gray-700`}
      aria-label="Sidebar"
    >
      <div className="h-full px-3 pb-4 overflow-y-auto bg-white dark:bg-gray-800">
        <ul className="space-y-2 font-medium">
          {sidebarItem.map((item, index) => {
            return (
              <SidebarItem
                to={item.to}
                Icon={item.Icon}
                text={item.text}
                isActive={activeItem === index}
                handleClick={() => handleItemClick(index)}
                key={index}
                {...(item.text === "Signout" ? { handleLogout } : {})}
              />
            );
          })}
        </ul>
      </div>
    </aside>
  );
};
export default SellerSideBar;
