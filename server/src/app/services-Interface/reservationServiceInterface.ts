import { ReservationServiceType } from "../../frameworks/services/reservationService";

export const reservationServiceInterface = (
  service: ReturnType<ReservationServiceType>
) => {
  const calculateGSTAmount = (subtotal: number) =>
    service.calculateGSTAmount(subtotal);

  return {
    calculateGSTAmount,
  };
};

export type ReservationServiceInterface = typeof reservationServiceInterface;
