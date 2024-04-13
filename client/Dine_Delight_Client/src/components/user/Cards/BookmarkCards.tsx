import { USER_API, defaultImageCardImage } from "../../../constants";
import { RestaurantInterface } from "../../../types/RestaurantInterface";
import { convert24HourTime } from "../../../utils/timeConverter";
import { useAppSelector } from "../../../redux/store/Store";
import { Link } from "react-router-dom";
import { useState } from "react";
import axiosJWT from "../../../utils/axiosService";
import showToast from "../../../utils/toaster";
import { FaBookmark, FaRegBookmark } from "react-icons/fa6";

interface BookmarkCardsInterface extends RestaurantInterface {
  handleRemoveBookmark: (restaurantId: string) => void;
}

const BookmarkCards: React.FC<BookmarkCardsInterface> = ({
  _id,
  restaurantName,
  primaryImage,
  address,
  tableRatePerPerson,
  openingTime,
  closingTime,
  handleRemoveBookmark,
}) => {
  const user = useAppSelector((state) => state.UserSlice);
  const [isBookmarked, setIsbookmarked] = useState<boolean>(true);

  const handleBookmark = async () => {
    const action = isBookmarked ? "removeFromBookmarks" : "addToBookmarks";
    axiosJWT
      .patch(`${USER_API}/bookmarks?action=${action}`, {
        restaurantId: _id,
      })
      .then(({ data }) => {
        showToast(data.message);
        setIsbookmarked(!isBookmarked);
        action === "removeFromBookmarks" && handleRemoveBookmark(_id);
      })
      .catch(() => {
        showToast("sorry,we couldn't complete that action.", "error");
      });
  };

  return (
    <div className="my-4 rounded-xl hover:shadow-lg  shadow-gray-200 dark:shadow-gray-900 bg-white dark:bg-gray-800 duration-300 hover:-translate-y-1">
      <figure>
        <Link to={`view_restaurant/${_id}`}>
          <img
            src={primaryImage ?? defaultImageCardImage}
            alt={"Image of " + restaurantName}
            className="rounded-t h-52 w-full object-cover"
          />
        </Link>
        <figcaption className="p-4 relative">
          {user.isAuthenticated && user.role === "user" && (
            <>
              <p
                className="absolute top-2 right-3 text-xl text-black  cursor-pointer"
                onClick={handleBookmark}
              >
                {isBookmarked ? <FaBookmark /> : <FaRegBookmark />}
              </p>
            </>
          )}
          <Link to={`/view_restaurant/${_id}`}>
            <h1 className="text-lg mb-1 font-bold leading-relaxed text-gray-800 dark:text-gray-300">
              {restaurantName}
            </h1>
          </Link>
          <p className="leading-5 text-gray-500 dark:text-gray-400">
            {address}
          </p>
          <p className="leading-5 text-gray-500 dark:text-gray-400">
            {tableRatePerPerson} for one
          </p>
        </figcaption>

        <p className="p-4 text-sm font-semibold">
          {convert24HourTime(openingTime)} - {convert24HourTime(closingTime)}
        </p>
      </figure>
    </div>
  );
};

export default BookmarkCards;
