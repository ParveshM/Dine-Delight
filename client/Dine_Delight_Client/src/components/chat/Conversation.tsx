import { useEffect, useState } from "react";
import { USER_API, randomImg } from "../../constants";
import { ChatInterface } from "../../types/ChatInterface";
import { RestaurantInterface } from "../../types/RestaurantInterface";
import axios from "axios";

interface ConversationProps extends ChatInterface {
  userId: string | null | undefined;
}
const Conversation: React.FC<ConversationProps> = ({ members, userId }) => {
  const [restaurant, setRestaurant] = useState<RestaurantInterface | null>(
    null
  );
  useEffect(() => {
    const restaurantId = members.find((member) => member !== userId);
    axios
      .get(USER_API + `/restaurants/${restaurantId}`)
      .then(({ data }) => setRestaurant(data.restaurant))
      .catch((err) => console.log(err));
  }, [userId]);

  return (
    <div className="flex items-center p-2 gap-2 mt-2 hover:bg-gray-200 hover:cursor-pointer rounded-md transition ease-in-out">
      <img
        src={restaurant?.primaryImage ?? randomImg}
        alt="User image"
        className="h-10 w-10 rounded-full object-cover"
      />
      <span className="font-semibold ">
        {restaurant?.restaurantName ?? "User"}
      </span>
    </div>
  );
};

export default Conversation;
