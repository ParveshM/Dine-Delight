const ViewReservationShimmer = () => {
  return (
    <div className="space-y-2">
      <div className="animate-pulse h-4 w-40 bg-gray-200 rounded-md"></div>
      <div className="animate-pulse h-4 w-48 bg-gray-200 rounded-md"></div>
      <div className="flex items-center gap-2">
        <div className="animate-pulse h-4 w-4 bg-gray-200 rounded-full"></div>
        <div className="animate-pulse h-4 w-16 bg-gray-200 rounded-md"></div>
      </div>
      <div className="flex items-center gap-2">
        <div className="animate-pulse h-4 w-4 bg-gray-200 rounded-full"></div>
        <div className="animate-pulse h-4 w-36 bg-gray-200 rounded-md"></div>
      </div>
      <div className="flex items-center gap-2">
        <div className="animate-pulse h-4 w-4 bg-gray-200 rounded-full"></div>
        <div className="animate-pulse h-4 w-12 bg-gray-200 rounded-md"></div>
      </div>
    </div>
  );
};
export default ViewReservationShimmer;
