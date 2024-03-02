import { ReactNode } from "react";

export type childrenProps = {
  children: ReactNode;
};

export type ApprovalModalType = {
  isModalOpen: (isOpen: boolean) => void;
};

export type NewRegistrationType = {
  isModalOpen: (isOpen: boolean) => void;
};
