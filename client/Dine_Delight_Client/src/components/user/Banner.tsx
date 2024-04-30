import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { BannerInterface } from "../../types/RestaurantInterface";
import { dineinVector } from "../../assets/images";
import { Link } from "react-router-dom";
import DefaultBanner from "./DefaultBanner";

const Banner: React.FC<{ banners: BannerInterface[] }> = ({ banners }) => {
  const [currentIndex, setcurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setcurrentIndex((prevIndex) => (prevIndex + 1) % banners.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [currentIndex, banners.length]);

  return banners.length ? (
    <section className="home py-6 mt-20  bg-gray-50 overflow-hidden ">
      <motion.div
        className="container flex flex-col md:flex-row items-center justify-center mx-auto px-4 md:px-12"
        initial={{ opacity: 0, x: 100 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -100 }}
        transition={{ duration: 1 }}
        key={currentIndex}
      >
        <div className="lg:w-1/2">
          <h1 className="max-w-xl text-4xl md:text-5xl text-gray-800 font-bold lg:max-w-md mb-6 md:mb-8 leading-tight">
            {banners[currentIndex]?.title}
          </h1>
          <p className="max-w-xl text-lg text-gray-600 font-medium mb-8 leading-relaxed md:text-xl lg:max-w-md">
            {banners[currentIndex]?.description}
          </p>
          <Link
            to={`/view_restaurant/${banners[currentIndex]?.restaurantUrl}`}
            className="inline-block px-6 py-3 text-lg font-medium
           text-white bg-gradient-to-r from-pink-500 to-orange-400
            rounded-md transition duration-300 ease-in-out hover:from-pink-600
             hover:to-orange-500 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2"
          >
            Reserve Now
          </Link>
        </div>
        <div className="lg:w-1/2 mt-8 md:mt-0 md:ml-8">
          <img
            className="w-full md:w-auto rounded-lg "
            src={banners[currentIndex]?.image || dineinVector}
            alt="Banner image"
          />
        </div>
      </motion.div>
    </section>
  ) : (
    <DefaultBanner />
  );
};

export default Banner;
