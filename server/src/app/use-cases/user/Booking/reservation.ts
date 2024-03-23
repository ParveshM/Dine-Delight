import Stripe from "stripe";
import bookingEntity from "../../../../entities/bookingEntity";
import { createReservationInterface } from "../../../../types/BookingInterface";
import { BookingDbRepositoryInterface } from "../../../interfaces/bookingDbRepository";
import { restaurantDbInterface } from "../../../interfaces/restaurantDbRepository";
import { TableDbInterface } from "../../../interfaces/tableDbRepository";
import { ReservationServiceInterface } from "../../../services-Interface/reservationServiceInterface";
import configKeys from "../../../../config";
import { Types } from "mongoose";

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

export const createPayment = async (
  userName: string = "John Doe",
  email: string = "johndoe@gmail.com",
  bookingId: string | Types.ObjectId,
  totalAmount: number
) => {
  const stripe = new Stripe(configKeys.STRIPE_SECRET_KEY);

  const customer = await stripe.customers.create({
    name: userName,
    email: email,
    address: {
      line1: "Los Angeles, LA",
      country: "US",
    },
  });
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    customer: customer.id,
    line_items: [
      {
        price_data: {
          currency: "inr",
          product_data: { name: "Guests", description: "Table booking" },
          unit_amount: Math.round(totalAmount * 100),
        },
        quantity: 1,
      },
    ],
    mode: "payment",
    success_url: `${configKeys.CLIENT_PORT}/payment_status/${bookingId}?success=true`,
    cancel_url: `${configKeys.CLIENT_PORT}/payment_status/${bookingId}?success=false`,
  });
  return session.id;
};
