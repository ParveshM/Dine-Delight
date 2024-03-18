export const reservationService = () => {
  const calculateGSTAmount = (
    subTotal: number
  ): {
    gstAmount: number;
    totalAmount: number;
  } => {
    const gstRate = 18;
    const gstAmount = (gstRate / 100) * subTotal;
    const totalAmount = subTotal + gstAmount;
    return { gstAmount, totalAmount };
  };

  return { calculateGSTAmount };
};

export type ReservationServiceType = typeof reservationService;
