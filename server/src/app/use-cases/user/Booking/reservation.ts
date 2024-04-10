import Stripe from "stripe";
import bookingEntity from "../../../../entities/bookingEntity";
import {
  TransactionDataType,
  createReservationInterface,
} from "../../../../types/BookingInterface";
import { BookingDbRepositoryInterface } from "../../../interfaces/bookingDbRepository";
import { restaurantDbInterface } from "../../../interfaces/restaurantDbRepository";
import { TableDbInterface } from "../../../interfaces/tableDbRepository";
import { ReservationServiceInterface } from "../../../services-Interface/reservationServiceInterface";
import configKeys from "../../../../config";
import { TableSlotDbInterface } from "../../../interfaces/TableSlotdbRepository";
import { updateWallet } from "./updateWallet";
import { UserDbInterface } from "../../../interfaces/userDbRepository";
import CustomError from "../../../../utils/customError";
import { HttpStatus } from "../../../../types/httpStatus";
import { Types } from "mongoose";
import { ObjectId } from "mongoose";

export const reserveATable = async (
  reservationData: createReservationInterface,
  userId: string,
  reservationService: ReturnType<ReservationServiceInterface>,
  bookingDbRepository: ReturnType<BookingDbRepositoryInterface>,
  restaurantDbRepository: ReturnType<restaurantDbInterface>,
  tableDbRepository: ReturnType<TableDbInterface>,
  tablSlotDbRepository: ReturnType<TableSlotDbInterface>,
  userRepository: ReturnType<UserDbInterface>
) => {
  const { restaurantId, tableId, tableSlotId, paymentMethod } = reservationData;
  console.log(reservationData);
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
  if (paymentMethod === "Wallet") {
    const wallet = await userRepository.getWalletByUseId(userId);
    if (wallet) {
      if (wallet.balance >= totalAmount) {
        const transactionData: TransactionDataType = {
          newBalance: totalAmount,
          type: "Debit",
          description: "Booking transaction",
        };
        await updateWallet(userId, transactionData, userRepository);
      } else {
        throw new CustomError(
          "Insufficient wallet balance",
          HttpStatus.BAD_REQUEST
        );
      }
    }
  }
  const booking = await bookingDbRepository.createBooking(newReservation);

  const updateSlot = await tablSlotDbRepository.updateSlot(tableId, {
    isAvailable: false,
  });

  return booking;
};

export const createPayment = async (
  userName: string = "John Doe",
  email: string = "johndoe@gmail.com",
  bookingId: string,
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

export const updateBookingStatus = async (
  id: string,
  paymentStatus: "Paid" | "Failed",
  bookingRepository: ReturnType<BookingDbRepositoryInterface>,
  tableSlotRepository: ReturnType<TableSlotDbInterface>
) => {
  const bookingStatus = paymentStatus === "Paid" ? "Confirmed" : "Pending";
  const updationData: Record<string, any> = {
    paymentStatus,
    bookingStatus,
  };

  const bookingData = await bookingRepository.updateBookingDetails(
    id,
    updationData
  );
  const tableSlotId = bookingData?.tableSlotId as unknown as string;
  if (paymentStatus === "Failed") {
    await tableSlotRepository.updateSlot(tableSlotId, {
      paymentStatus: "Failed",
      isAvailable: true,
    });
  }
  return bookingData;
};

export const getBookings = async (
  userID: string,
  bookingRepository: ReturnType<BookingDbRepositoryInterface>
) => await bookingRepository.bookings({ userId: new Types.ObjectId(userID) });

export const getBookingByBookingId = async (
  bookingID: string,
  bookingRepository: ReturnType<BookingDbRepositoryInterface>
) => {
  const bookingDetails = await bookingRepository.getBookingById(bookingID);
  const preOrder = await bookingRepository.getPreoOrderbyBookingId(bookingID);
  return { bookingDetails, preOrder };
};

export const getReviewsByUserId = async (
  userID: string,
  restaurantID: Types.ObjectId,
  restaurantRepository: ReturnType<restaurantDbInterface>
) =>
  await restaurantRepository.getRatings({
    userId: userID,
    restaurantId: restaurantID,
  });
