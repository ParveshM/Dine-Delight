import { ReactNode } from "react";
import {
  RestaurantInterface,
  newRestaurantInterface,
} from "./RestaurantInterface";

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

export interface RatingProps {
  className?: string;
  count?: number;
  value: number;
  color?: string;
  hoverColor?: string;
  activeColor?: string;
  size?: number;
  edit?: boolean;
  isHalf?: boolean;
  onChange?: (value: number) => void;
  emptyIcon?: React.ReactElement;
  halfIcon?: React.ReactElement;
  fullIcon?: React.ReactElement;
}

export interface GraphData {
  month: number;
  profit: number;
}

export interface bookingStatisticsInterface {
  bookingStatus: string;
  count: number;
}

export interface ReportDataInterface {
  createdAt: Date;
  _id: string;
  adminPayment: number;
  restaurant: RestaurantInterface;
}
