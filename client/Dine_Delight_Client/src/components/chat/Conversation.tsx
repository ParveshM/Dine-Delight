import { useEffect, useState } from "react";
import { USER_API } from "../../constants";
import { ChatInterface } from "../../types/ChatInterface";
import { RestaurantInterface } from "../../types/RestaurantInterface";
import axios from "axios";
import { UserInterface } from "../../types/UserInterface";
import { useAppSelector } from "../../redux/store/Store";
import { dummyUserImg } from "../../assets/images";

interface ConversationProps extends ChatInterface {
  userId: string | null | undefined;
}
const Conversation: React.FC<ConversationProps> = ({ members, userId }) => {
  const { role } = useAppSelector((state) => state.UserSlice);
  const [restaurant, setRestaurant] = useState<RestaurantInterface | null>(
    null
  );
  const [userinfo, setUserInfo] = useState<UserInterface | null>(null);

  useEffect(() => {
    const recieverId = members.find((member) => member !== userId);
    const PATH: string = role === "user" ? "/restaurants" : "/users";
    axios
      .get(USER_API + `${PATH}/${recieverId}`)
      .then(({ data }) => {
        role === "user"
          ? setRestaurant(data.restaurant)
          : setUserInfo(data.user);
      })
      .catch((err) => console.log(err));
  }, [userId]);

  return (
    <div className="flex items-center p-2 gap-2 mt-2 hover:bg-gray-200 hover:cursor-pointer rounded-md transition ease-in-out">
      <img
        src={
          role === "user"
            ? restaurant?.primaryImage ?? dummyUserImg
            : userinfo?.profilePicture ?? dummyUserImg
        }
        alt="User image"
        className="h-10 w-10 rounded-full object-cover"
      />
      <span className="font-semibold ">
        {role === "user"
          ? restaurant?.restaurantName ?? "Unnamed"
          : userinfo?.name ?? "Unnamed"}
      </span>
    </div>
  );
};

export default Conversation;
