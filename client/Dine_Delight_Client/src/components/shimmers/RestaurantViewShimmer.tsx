export const RestaurantViewShimmer: React.FC = () => {
  return (
    <div className="h-screen flex flex-col lg:flex-row mt-20">
      <div className="animate-pulse flex-1 border rounded-md shadow-md p-2 mx-4">
        <div className="p-4">
          <div className="w-2/3 h-6 bg-gray-200 rounded mb-2"></div>
          <div className="w-1/2 h-4 bg-gray-200 rounded mb-2"></div>
          <div className="w-3/4 h-4 bg-gray-200 rounded mb-2"></div>
          <div className="w-1/3 h-4 bg-gray-200 rounded mb-2"></div>
          <div className="w-2/5 h-4 bg-gray-200 rounded mb-2"></div>
          <div className="w-3/4 h-4 bg-gray-200 rounded mb-2"></div>
          {/* Repeat similar shimmer effect placeholders for other details */}
        </div>
      </div>
      <div className="lg:w-1/3 border rounded-md shadow-md mx-2 md:mx-0 mt-5 md:mt-0">
        <div className="p-4">
          <div className="w-full h-80 bg-gray-200 rounded"></div>
          <div className="flex flex-col gap-2 mt-4">
            <div className="w-2/3 h-4 bg-gray-200 rounded"></div>
            <div className="w-3/4 h-4 bg-gray-200 rounded"></div>
            <div className="w-1/2 h-4 bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>
    </div>
  );
};
