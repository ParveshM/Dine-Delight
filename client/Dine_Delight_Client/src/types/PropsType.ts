import { ReactNode } from "react";
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
