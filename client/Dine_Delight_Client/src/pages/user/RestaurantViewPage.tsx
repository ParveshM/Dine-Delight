import { TECarousel, TECarouselItem } from "tw-elements-react";
import Footer from "../../components/user/Footer/Footer";
import Navbar from "../../components/user/Header/Navbar";
import { useEffect, useState } from "react";
import {
  RestaurantInterface,
  TableSlotInterface,
} from "../../types/RestaurantInterface";
import { USER_API } from "../../constants";
import { Link, useNavigate, useParams } from "react-router-dom";
import showToast from "../../utils/toaster";
import axios from "axios";
import {
  FaCircleChevronLeft,
  FaCircleChevronRight,
  FaPhone,
  FaRegClock,
} from "react-icons/fa6";
import { IoLocationSharp } from "react-icons/io5";
import { convert24HourTime } from "../../utils/timeConverter";
import TableSlotFilter from "../../components/user/RestaurantTableFilter";
import { BiSolidNavigation } from "react-icons/bi";
import { MdEmail } from "react-icons/md";
import NotFoundPage from "../../components/Error404";
import { RestaurantViewShimmer } from "../../components/shimmers/RestaurantViewShimmer";

const RestaurantView = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [restaurant, setResturant] = useState<RestaurantInterface>();
  const [tableSlot, setTableSlot] = useState<TableSlotInterface[]>([]);
  const [error, setError] = useState<boolean>(false);

  useEffect(() => {
    axios
      .get(USER_API + `/restaurants/${id}`)
      .then(({ data }) => {
        setTimeout(() => {
          setResturant(data.restaurant);
          setTableSlot(data.tableSlots);
        }, 1000);
      })
      .catch(() => {
        console.error("Page not found");
        setError(true);
      });
  }, []);
  if (error) return <NotFoundPage />;
  return (
    <>
      <Navbar />

      {!restaurant ? (
        <RestaurantViewShimmer />
      ) : (
        <div className="h-screen flex flex-col lg:flex-row mt-20">
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
                <div className=" flex items-center  gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className=" h-5 w-5 text-orange-300"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"
                    />
                  </svg>
                  <p>4.5</p>
                </div>
                <hr className="bg-slate-200 h-[2px] " />
                <div className=" flex flex-col  text-lg mb-2 ">
                  <p className="font-bold ">Why we like it</p>
                  <p className="font-medium">{restaurant.description}</p>
                </div>
                <TableSlotFilter
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
                  {restaurant?.secondaryImages?.map((imageUrl, index) => (
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
                  ))}
                </div>
              </TECarousel>
              {/* <h1 className="text-2xl font-bold">Direction</h1>
            <div className="text-xl mt-2">Map Details</div> */}
              <h1 className="text-2xl font-bold mt-4">Contact</h1>
              <div className="flex flex-col gap-2 mt-2">
                {/* <div className="flex items-center gap-2 hover:underline ">
                <BiSolidNavigation className="hover:underline" />
                <Link to="" className="font-medium hover:font-bold">
                  Get Direction
                </Link>
              </div> */}
                {/* <hr className="h-0.5 bg-slate-100" /> */}
                <div className="flex items-center gap-2 ">
                  <FaPhone />
                  <Link
                    to=""
                    className="font-medium hover:underline hover:font-bold"
                  >
                    {restaurant.phone}
                  </Link>
                </div>
                <hr className="h-0.5 bg-slate-100" />
                <div className="flex items-center gap-2 ">
                  <MdEmail />
                  <Link
                    to=""
                    className="font-medium hover:underline hover:font-bold"
                  >
                    {restaurant.email}
                  </Link>
                </div>{" "}
                <hr className="h-0.5 bg-slate-100" />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* <Footer /> */}
    </>
  );
};

export default RestaurantView;
