import { BiSolidNavigation } from "react-icons/bi";
import { Link } from "react-router-dom";
import { FaBookmark, FaRegBookmark } from "react-icons/fa6";
import { USER_API, defaultImageCardImage } from "../../../constants";
import { convert24HourTime } from "../../../utils/timeConverter";
import { Rating } from "flowbite-react";
import getDistance from "../../../Api/getDistance";
import { useAppSelector } from "../../../redux/store/Store";
import { forwardRef, useEffect, useMemo, useState } from "react";
import { RestaurantInterface } from "../../../types/RestaurantInterface";
import axiosJWT from "../../../utils/axiosService";
import showToast from "../../../utils/toaster";
interface CardListProps extends RestaurantInterface {
  isBookmarkedByUser: boolean;
}
const CardsList: React.ForwardRefRenderFunction<
  HTMLDivElement,
  CardListProps
> = (
  {
    restaurantName,
    _id,
    address,
    primaryImage,
    openingTime,
    closingTime,
    location,
    tableRatePerPerson,
    rating,
    isBookmarkedByUser,
  },
  ref
) => {
  const [distance, setDistance] = useState<string | null>(null);
  const userLocation = useAppSelector((state) => state.LocationSlice);
  const user = useAppSelector((state) => state.UserSlice);
  const [isBookmarked, setIsbookmarked] = useState<boolean>(
    isBookmarkedByUser ?? false
  );
  useEffect(() => {
    if (userLocation.location.coordinates[0] && location) {
      const fetchDistance = async () => {
        const distanceInKm = await getDistance(
          userLocation.location.coordinates,
          location?.coordinates ?? []
        );

        setDistance(distanceInKm);
      };
      fetchDistance();
    }
  }, [userLocation.location.coordinates]);

  const handleBookmark = async () => {
    const action = isBookmarked ? "removeFromBookmarks" : "addToBookmarks";
    axiosJWT
      .patch(`${USER_API}/bookmarks?action=${action}`, {
        restaurantId: _id,
      })
      .then(({ data }) => {
        showToast(data.message);
        setIsbookmarked(!isBookmarked);
      })
      .catch(() => {
        showToast("sorry,we couldn't complete that action.", "error");
      });
  };

  const calculatedStarRating = useMemo(() => {
    if (rating?.length) {
      return (
        rating.map((rate) => rate.rating).reduce((acc, curr) => acc + curr, 0) /
        rating.length
      ).toFixed(1);
    }
  }, []);
  const starRating: string = calculatedStarRating
    ? calculatedStarRating
    : "4.5";

  return (
    <div
      ref={ref}
      className="my-4 rounded-xl hover:shadow-lg  shadow-gray-200 dark:shadow-gray-900 bg-white dark:bg-gray-800 duration-300 hover:-translate-y-1"
    >
      <figure>
        <Link to={`view_restaurant/${_id}`}>
          <img
            src={primaryImage || defaultImageCardImage}
            alt={"Image of " + restaurantName}
            className="rounded-t h-52 w-full object-cover"
          />
        </Link>
        <figcaption className="p-4 relative ">
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
          {userLocation.location.coordinates[0] && distance && (
            <p className="absolute bottom-0 right-3 inline-flex gap-2 items-center text-sm">
              {<BiSolidNavigation />}
              {distance}Km
            </p>
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
        <div className="flex items-center justify-between px-2">
          <Rating>
            <Rating.Star className="text-orange-400" />
            <p className="ml-2 text-sm font-bold text-gray-900 dark:text-white">
              {starRating}
            </p>
          </Rating>

          <p className="p-4 text-sm font-semibold">
            {convert24HourTime(openingTime)} - {convert24HourTime(closingTime)}
          </p>
        </div>
      </figure>
    </div>
  );
};

export default forwardRef(CardsList);
