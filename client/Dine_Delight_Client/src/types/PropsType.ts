import { ReactElement, ReactNode } from "react";
import { newRestaurantInterface } from "./RestaurantInterface";

export type childrenProps = {
  children: ReactNode;
};

export type RestDetailsType = {
  id: string;
  name: string;
  email: string;
};

export type ApprovalModalType = {
  name: string | undefined;
  email: string | undefined;
  isModalOpen: (isOpen: boolean) => void;
  sendAction: (action: string) => void;
};

export type NewRegistrationType = newRestaurantInterface & {
  isModalOpen: (isOpen: boolean) => void;
  sendDetails: (data: RestDetailsType) => void;
};

export interface Payload {
  id: string;
  name: string;
  role: string;
  iat: number;
  exp: number;
}
export interface SidebarProps {
  showSidebar: boolean;
  handleLogout: () => void;
}

export interface SidebarItemInterface {
  to: string | "#";
  Icon: React.ElementType;
  text: string;
  isActive: boolean;
  handleClick: () => void;
  handleLogout?: () => void;
}
