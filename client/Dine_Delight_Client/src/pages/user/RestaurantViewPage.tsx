import { TECarousel, TECarouselItem } from "tw-elements-react";
import Footer from "../../components/user/Footer/Footer";
import Navbar from "../../components/user/Header/Navbar";
import { useEffect, useState } from "react";
import { RestaurantInterface } from "../../types/RestaurantInterface";
import { USER_API } from "../../constants";
import { useNavigate, useParams } from "react-router-dom";
import showToast from "../../utils/toaster";
import axios from "axios";

const RestaurantView = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [restaurant, setResturant] = useState<RestaurantInterface>();

  useEffect(() => {
    axios
      .get(USER_API + `/get_singleRestaurant/${id}`)
      .then(({ data }) => {
        setResturant(data.restaurant);
      })
      .catch(() => {
        showToast("Something went wrong while fetching restaurant", "error");
        navigate("/");
      });
  }, []);

  if (!restaurant) return <h1>Loading ...</h1>;
  return (
    <>
      <Navbar />

      <div className="h-screen flex flex-col lg:flex-row mt-20">
        <div className="lg:w-full bg-slate-200">
          <div className="p-4">
            {/* Carousel for Images */}
            <div className=" bg-white">
              <TECarousel
                showControls
                showIndicators
                ride="carousel"
                interval={false}
              >
                <div className="relative w-full overflow-hidden after:clear-both after:block after:content-['']">
                  {restaurant?.secondaryImages?.map((imageUrl, index) => (
                    <TECarouselItem
                      itemID={index}
                      className="relative float-left -mr-[100%] hidden w-full transition-transform duration-[600ms] ease-in-out motion-reduce:transition-none"
                    >
                      <img
                        src={imageUrl}
                        className="block w-full object-cover h-72 rounded-lg"
                        alt={restaurant.restaurantName + " images"}
                      />
                    </TECarouselItem>
                  ))}
                </div>
              </TECarousel>
            </div>

            <div className="mt-4">
              <h1 className="text-4xl font-bold">Restaurant Name</h1>
              <h2 className="text-2xl font-semibold mt-2">Description</h2>
              <p className="text-xl mt-2">Star Rating</p>
            </div>
          </div>
        </div>

        {/* Right Section: Direction and Contact Details */}
        <div className="lg:w-1/3 bg-red-100">
          <div className="p-4 ">
            <h1 className="text-2xl font-bold">Direction</h1>
            <div className="text-xl mt-2">Map Details</div>
            <h1 className="text-2xl font-bold mt-4">Contact</h1>
            <div className="text-xl mt-2">Contact Details</div>
          </div>
        </div>
      </div>
      {/* <Footer /> */}
    </>
  );
};

export default RestaurantView;

export function CarouselBasicExample(): JSX.Element {
  return (
    <>
      <TECarousel showControls showIndicators ride="carousel">
        <div className="relative w-full overflow-hidden after:clear-both after:block after:content-['']">
          <TECarouselItem
            itemID={1}
            className="relative float-left -mr-[100%] hidden w-full transition-transform duration-[600ms] ease-in-out motion-reduce:transition-none"
          >
            <img
              src="https://tecdn.b-cdn.net/img/Photos/Slides/img%20(15).jpg"
              className="block w-full"
              alt="..."
            />
            <div className="absolute inset-x-[15%] bottom-5 hidden py-5 text-center text-white md:block">
              <h5 className="text-xl">First slide label</h5>
              <p>
                Some representative placeholder content for the first slide.
              </p>
            </div>
          </TECarouselItem>
          <TECarouselItem
            itemID={2}
            className="relative float-left hidden -mr-[100%] w-full transition-transform duration-[600ms] ease-in-out motion-reduce:transition-none"
          >
            <img
              src="https://tecdn.b-cdn.net/img/Photos/Slides/img%20(22).jpg"
              className="block w-full"
              alt="..."
            />
            <div className="absolute inset-x-[15%] bottom-5 hidden py-5 text-center text-white md:block">
              <h5 className="text-xl">Second slide label</h5>
              <p>
                Some representative placeholder content for the second slide.
              </p>
            </div>
          </TECarouselItem>
          <TECarouselItem
            itemID={3}
            className="relative float-left -mr-[100%] hidden w-full transition-transform duration-[600ms] ease-in-out motion-reduce:transition-none"
          >
            <img
              src="https://tecdn.b-cdn.net/img/Photos/Slides/img%20(23).jpg"
              className="block w-full"
              alt="..."
            />
            <div className="absolute inset-x-[15%] bottom-5 hidden py-5 text-center text-white md:block">
              <h5 className="text-xl">Third slide label</h5>
              <p>
                Some representative placeholder content for the third slide.
              </p>
            </div>
          </TECarouselItem>
        </div>
      </TECarousel>
    </>
  );
}
