import bookingEntity from "../../../../entities/bookingEntity";
import { createReservationInterface } from "../../../../types/bookinginterface";
import { BookingDbRepositoryInterface } from "../../../interfaces/bookingdbrepository";
import { restaurantDbInterface } from "../../../interfaces/restaurantDbRepository";
import { TableDbInterface } from "../../../interfaces/tableDbRepository";
import { ReservationServiceInterface } from "../../../services-Interface/reservationserviceinterface";

export const reserveATable = async (
  reservationData: createReservationInterface,
  userId: string,
  reservationService: ReturnType<ReservationServiceInterface>,
  bookingDbRepository: ReturnType<BookingDbRepositoryInterface>,
  restaurantDbRepository: ReturnType<restaurantDbInterface>,
  tableDbRepository: ReturnType<TableDbInterface>
) => {
  const { restaurantId, tableId, tableSlotId, paymentMethod } = reservationData;
  const restaurantDetails = await restaurantDbRepository.getRestaurantById(
    restaurantId
  );
  const tableDetails = await tableDbRepository.getTablebyId(tableId);
  // calculate subTotal , gst and totalAmount
  let subTotal: number,
    gstAmount: number = 0,
    totalAmount: number = 0;
  if (restaurantDetails && tableDetails) {
    subTotal =
      tableDetails?.capacity * (restaurantDetails.tableRatePerPerson ?? 0);
    const { gstAmount: calculatedGst, totalAmount: calculatedTotal } =
      reservationService.calculateGSTAmount(subTotal);
    gstAmount = calculatedGst;
    totalAmount = calculatedTotal;
  }

  const newReservation = bookingEntity(
    userId,
    restaurantId,
    tableId,
    tableSlotId,
    paymentMethod,
    gstAmount,
    totalAmount
  );
  return await bookingDbRepository.createBooking(newReservation);
};
