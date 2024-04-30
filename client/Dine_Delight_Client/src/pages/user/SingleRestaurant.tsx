import { TECarousel, TECarouselItem } from "tw-elements-react";
import Footer from "../../components/user/Footer/Footer";
import Navbar from "../../components/user/Header/Navbar";
import { useEffect, useMemo, useState } from "react";
import {
  RestaurantInterface,
  ReviewInterface,
  TableSlotInterface,
} from "../../types/RestaurantInterface";
import { CHAT_API, USER_API, defaultImageCardImage } from "../../constants";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import {
  FaCircleChevronLeft,
  FaCircleChevronRight,
  FaPhone,
  FaRegClock,
} from "react-icons/fa6";
import { IoLocationSharp } from "react-icons/io5";
import { convert24HourTime } from "../../utils/timeConverter";
import TableSlotFilter from "../../components/user/slotFilter/RestaurantTableFilter";
import { BiSolidNavigation } from "react-icons/bi";
import { MdEmail } from "react-icons/md";
import NotFoundPage from "../Error404";
import { RestaurantViewShimmer } from "../../components/shimmers/RestaurantViewShimmer";
import StarRating from "../../components/user/Review/StarRating";
import ReviewSlider from "../../components/user/Review/ReviewSlider";
import { MessageCircleMore } from "lucide-react";
import { useAppSelector } from "../../redux/store/Store";
import CustomMap from "../../components/restaurant/Map";
import { foodCover } from "../../assets/images";

const SingleRestaurant = () => {
  const { id } = useParams();
  const [restaurant, setResturant] = useState<RestaurantInterface>();
  const [tableSlot, setTableSlot] = useState<TableSlotInterface[]>([]);
  // const [dateSlots, setDateSlots] = useState<TableSlotInterface[]>([]);
  const [error, setError] = useState<boolean>(false);
  const [ratings, setRatings] = useState<ReviewInterface[]>([]);
  const [showTooltip, setTooltip] = useState<boolean>(false);
  const user = useAppSelector((state) => state.UserSlice);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(USER_API + `/restaurants/${id}`)
      .then(({ data }) => {
        const { restaurant, tableSlots, ratings, dateSlots } = data;
        setRatings(ratings);
        setResturant(restaurant);
        setTableSlot(tableSlots);
        // setDateSlots(dateSlots);
      })
      .catch(() => {
        console.error("Page not found");
        setError(true);
      });
  }, []);

  const handleChatClick = () => {
    axios
      .post(CHAT_API + `/conversations`, {
        senderId: user.id,
        recieverId: id,
      })
      .then(({ data }) => {
        const chatID: string = data.chats._id;
        navigate(`/chat?conversation=${chatID}`);
      })
      .catch(() => {
        console.log("error in creating chat");
      });
  };

  const calculatedStarRating = useMemo(() => {
    if (ratings?.length) {
      return (
        ratings
          .map((rate) => rate.rating)
          .reduce((acc, curr) => acc + curr, 0) / ratings.length
      ).toFixed(1);
    }
  }, [ratings]);

  const starRating: string = calculatedStarRating
    ? calculatedStarRating
    : "4.5";

  if (error) return <NotFoundPage />;
  return (
    <>
      <Navbar />

      {!restaurant ? (
        <RestaurantViewShimmer />
      ) : (
        <>
          <div className=" flex flex-col lg:flex-row mt-20">
            <div className="lg:w-2/3  border rounded-md shadow-md p-2 mx-4">
              <div className="p-4 ">
                <div className="mt-4 space-y-3">
                  <h1 className="text-4xl font-semibold uppercase">
                    {restaurant.restaurantName}
                  </h1>
                  <div className="text-lg flex items-center gap-2 mt-2">
                    <IoLocationSharp />
                    <p>{restaurant.address}</p>
                  </div>
                  <div className=" flex items-center text-lg  gap-2">
                    <FaRegClock />
                    <p className="font-medium">
                      {convert24HourTime(restaurant.openingTime)} -{" "}
                      {convert24HourTime(restaurant.closingTime)}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <StarRating
                      value={parseInt(starRating) ?? 4.5}
                      className="flex"
                    />
                    <div className="flex items-center">
                      <p className="ms-1 text-sm font-medium text-gray-500 dark:text-gray-400">
                        {starRating}
                      </p>
                      <p className="ms-1 text-sm font-medium text-gray-500 dark:text-gray-400">
                        out of 5
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <img
                      src={foodCover}
                      alt="Menu icon"
                      height={25}
                      width={25}
                    />
                    <Link to={`/menu/${id}`} className="hover:underline">
                      Show menu
                    </Link>
                  </div>

                  {user.isAuthenticated && (
                    <div className="flex justify-end items-center">
                      {/* Share option */}
                      <div
                        className=" relative p-2 bg-blue-100 rounded-full"
                        onClick={handleChatClick}
                        onMouseEnter={() => setTooltip(true)}
                        onMouseLeave={() => setTooltip(false)}
                      >
                        <MessageCircleMore className="w-5 h-5 text-blue-500 cursor-pointer" />
                        {showTooltip && (
                          <div className="absolute bottom-12 right-4 bg-black text-white p-2 rounded-md ">
                            Chat with Restaurant
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                  <hr className="bg-slate-200 h-[2px] " />
                  <div className=" flex flex-col  text-lg mb-2 ">
                    <p className="font-bold ">Why we like it</p>
                    <p className="font-medium">{restaurant.description}</p>
                  </div>
                  <TableSlotFilter
                    restaurantInfo={restaurant}
                    tableSlots={tableSlot}
                    setTableSlot={setTableSlot}
                  />
                </div>
              </div>
            </div>

            {/* Right Section: Direction and Contact Details */}
            <div className="lg:w-1/3 border rounded-md shadow-md mx-2 md:mx-0 mt-5 md:mt-0">
              <div className="p-4 ">
                {/* Carousel for Images */}
                <TECarousel
                  className=" shadow-md bg-none"
                  showControls
                  showIndicators
                  touch
                  nextBtnIcon={
                    <FaCircleChevronRight className="text-3xl text-white hover:text-slate-200 transition" />
                  }
                  prevBtnIcon={
                    <FaCircleChevronLeft className="text-3xl text-white hover:text-slate-200 transition" />
                  }
                  ride="carousel"
                  interval={false}
                >
                  <div className="relative w-full overflow-hidden after:clear-both after:block after:content-[''] rounded-md">
                    {restaurant.secondaryImages?.length ? (
                      restaurant?.secondaryImages?.map((imageUrl, index) => (
                        <TECarouselItem
                          itemID={index}
                          key={index}
                          className="relative float-left -mr-[100%] hidden w-full transition-transform duration-[600ms] ease-in-out motion-reduce:transition-none"
                        >
                          <img
                            src={imageUrl}
                            className="block w-full object-cover h-72 "
                            alt={restaurant.restaurantName + " images"}
                          />
                        </TECarouselItem>
                      ))
                    ) : (
                      <img
                        src={restaurant.primaryImage ?? defaultImageCardImage}
                        className="block w-full object-cover h-72 "
                        alt={restaurant.restaurantName + " images"}
                      />
                    )}
                  </div>
                </TECarousel>
                <h2 className="text-3xl  mt-2" style={{ fontWeight: "bold" }}>
                  Here to find
                </h2>
                <div className="rounded-md overflow-hidden  mt-4">
                  <CustomMap
                    longitude={restaurant.location?.coordinates[0]}
                    latitude={restaurant.location?.coordinates[1]}
                    isMarkerDraggable={false}
                  />
                </div>
                <div className="flex flex-col gap-2 mt-2 text-blue-500 ">
                  <div className="flex items-center gap-2 hover:text-blue-600">
                    <BiSolidNavigation />
                    <Link
                      to={`https://maps.google.com/?q=${restaurant.location?.coordinates[1]},${restaurant.location?.coordinates[0]}`}
                      target="_blank"
                      className="font-medium hover:underline font-mono"
                    >
                      Get Direction
                    </Link>
                  </div>
                  <div className="flex items-center gap-2 hover:text-blue-600 ">
                    <FaPhone />
                    <Link
                      to=""
                      className="font-medium hover:underline font-mono"
                    >
                      {restaurant.phone}
                    </Link>
                  </div>
                  <hr className="h-0.5 bg-slate-100" />
                  <div className="flex items-center gap-2 hover:text-blue-600 ">
                    <MdEmail />
                    <Link
                      to={`https://mail.google.com/mail/u/0/?to=${restaurant.email}&body=Hi ${restaurant.restaurantName}, I need some assistance&bcc=%7Bemail_address%7D&cc=%7Bemail_address%7D&fs=1&tf=cm
                      `}
                      className="font-medium hover:underline font-mono"
                    >
                      {restaurant.email}
                    </Link>
                  </div>{" "}
                  <hr className="h-0.5 bg-slate-100" />
                </div>
              </div>
            </div>
          </div>
          {ratings.length ? (
            <section className="mt-2 border shadow-md rounded-md p-2">
              <h1 className="text-2xl text-center font-semibold ">Reviews</h1>
              <div className="bg-white shadow-md rounded-md">
                <ReviewSlider ratings={ratings} />
              </div>
            </section>
          ) : null}
        </>
      )}
      <Footer />
    </>
  );
};

export default SingleRestaurant;
