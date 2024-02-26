import restaurantApprovalEmail, {
  restaurantRejectionMail,
} from "../../../utils/restaurantApprovalEmail";
import sentMail from "../../../utils/sendMail";
import { restaurantDbInterface } from "../../interfaces/restaurantDbRepository";
import { UserDbInterface } from "../../interfaces/userDbRepository";

export const blockUser = async (
  id: string,
  userDbRepository: ReturnType<UserDbInterface>
) => {
  const user = await userDbRepository.getUserbyId(id);

  await userDbRepository.updateUserBlock(id, !user?.isBlocked); //update user block status
  return;
};

export const updateRestaurantApproval = async (
  id: string,
  restaurantDbRepository: ReturnType<restaurantDbInterface>
) => {
  const updated = await restaurantDbRepository.updateRestaurantApproval(id);
  if (updated) {
    sentMail(
      updated.email,
      "Restaurant account has been approved",
      restaurantApprovalEmail(updated.restaurantName)
    );
  }
};

export const updateRestaurantRejected = async (
  id: string,
  restaurantDbRepository: ReturnType<restaurantDbInterface>
) => {
  const updated = await restaurantDbRepository.updateRestaurantRejected(id);
  if (updated) {
    sentMail(
      updated.email,
      "Restaurant account has been Reject",
      restaurantRejectionMail(updated.restaurantName)
    );
  }
};

export const updateRestaurantListing = async (
  id: string,
  restaurantDbRepository: ReturnType<restaurantDbInterface>
) => {
  const restaurant = await restaurantDbRepository.getRestaurantById(id);
  await restaurantDbRepository.updateRestaurantListing(
    id,
    !restaurant?.isListed
  );
};
