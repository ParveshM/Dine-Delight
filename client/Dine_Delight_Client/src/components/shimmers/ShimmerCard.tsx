import { Rating } from "flowbite-react";

const ShimmerCard = () => {
  return (
    <div className="my-4 rounded-xl hover:shadow-lg shadow-gray-200 dark:shadow-gray-900 bg-white dark:bg-gray-800 duration-300 hover:-translate-y-1">
      <div className="animate-pulse">
        <div className="rounded-t h-52 w-full bg-gray-300 dark:bg-gray-600"></div>
        <div className="p-4 relative">
          <div className="absolute top-2 right-3 bg-gray-300 dark:bg-gray-600 w-8 h-8 rounded-full"></div>
          <div className="mb-2 bg-gray-300 dark:bg-gray-600 h-4 w-2/3"></div>
          <div className="bg-gray-300 dark:bg-gray-600 h-4 w-1/2"></div>
        </div>
        <div className="flex items-center justify-between px-2">
          <Rating>
            <div className="text-orange-400"></div>
            <p className="ml-2 text-sm font-bold text-gray-900 dark:text-white">
              4.95
            </p>
          </Rating>
          <div className="p-4 bg-gray-300 dark:bg-gray-600 h-4 w-1/3"></div>
        </div>
      </div>
    </div>
  );
};

export default ShimmerCard;
