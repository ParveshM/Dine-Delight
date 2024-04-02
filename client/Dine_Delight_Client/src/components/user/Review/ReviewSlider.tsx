import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ReviewInterface } from "../../../types/RestaurantInterface";

const ReviewSlider: React.FC<{ ratings: ReviewInterface[] }> = ({
  ratings,
}) => {
  const [currentReviewIndex, setCurrentReviewIndex] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentReviewIndex((prevIndex) => (prevIndex + 1) % ratings.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex justify-center items-center p-2 mb-2">
      <div className="bg-gray-200 rounded-lg p-3 text-center md:w-2/3">
        <motion.div
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -100 }}
          transition={{ duration: 0.5 }}
          key={currentReviewIndex}
          className="flex flex-col items-center space-y-4"
        >
          <p className="text-xl font-semibold">
            {ratings[currentReviewIndex].userId.name}
          </p>
          <p className="text-lg font-light text-gray-700 ">
            {ratings[currentReviewIndex].description}
          </p>
          <div className="flex items-center justify-center space-x-2">
            {[...Array(ratings[currentReviewIndex].rating)].map((_, index) => (
              <svg
                key={index}
                className="text-yellow-500 w-4 h-4"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                stroke="currentColor"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
              </svg>
            ))}
          </div>
          <p className="text-sm font-light text-gray-500">
            {ratings[currentReviewIndex].createdAt &&
              new Date(
                ratings[currentReviewIndex].createdAt
              ).toLocaleDateString("en-IN", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default ReviewSlider;
