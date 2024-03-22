const NoRestaurantFound: React.FC = () => {
  return (
    <div className="col-span-6 flex flex-col justify-center items-center">
      <img
        src="https://cdni.iconscout.com/illustration/premium/thumb/search-result-not-found-2130361-1800925.png"
        alt="No Results"
        className="h-48 w-48 mb-4"
      />
      <h2 className="text-2xl  font-bold mb-2">No restaurants found</h2>
      <p className="text-lg  text-gray-600">
        Sorry, we couldn't find any restaurants matching your search.
      </p>
    </div>
  );
};

export default NoRestaurantFound;
