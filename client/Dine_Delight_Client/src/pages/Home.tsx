import { useEffect, useState } from "react";
import Banner from "../components/user/Banner";
import CardsList from "../components/user/Cards/CardsList";
import Navbar from "../components/user/Header/Navbar";
import SearchBar from "../components/user/SearchBar";
import { RestaurantInterface } from "../types/RestaurantInterface";
import axios from "axios";
import { USER_API } from "../constants";
import Footer from "../components/user/Footer/Footer";
import ShimmerCard from "../components/shimmers/ShimmerCard";
import { useQuery } from "react-query";
import NoRestaurantFound from "../components/NoItemFound";
import { useAppSelector } from "../redux/store/Store";
import showToast from "../utils/toaster";

const Home: React.FC = () => {
  // use Query for caching the data fetched on home page
  const { location } = useAppSelector((state) => state.LocationSlice);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [data, setData] = useState<RestaurantInterface[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);

  // const { isLoading, data } = useQuery(
  //   ["restaurants", searchQuery, location.coordinates],
  //   async () => {
  //     const response = await axios.get(USER_API + "/restaurants", {
  //       params: { q: searchQuery, location: location.coordinates },
  //     });
  //     return response.data?.restaurants ?? [];
  //   }
  // );
  const fetchRes = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(USER_API + "/restaurants", {
        params: {
          q: searchQuery,
          location: location.coordinates,
          page: page,
        },
      });
      setData((prev) =>
        prev.length
          ? [...prev, ...(response.data?.restaurants ?? [])]
          : response.data?.restaurants ?? []
      );
      setData(response.data?.restaurants);

      setPage((prevPage) => prevPage + 1);
    } catch (error) {
      showToast("Oops! Something went wrong", "error");
    } finally {
      setTimeout(() => setIsLoading(false), 100);
    }
  };
  useEffect(() => {
    fetchRes();
  }, [searchQuery]);

  // const handleScroll = () => {
  //   const scrollableElement = document.documentElement; // Use the scrollable container element

  //   // Calculate the distance between the bottom of the scrollable container and the bottom of the viewport
  //   const distanceToBottom =
  //     scrollableElement.scrollHeight -
  //     (window.innerHeight + scrollableElement.scrollTop);

  //   // Check if the user has scrolled to the bottom and isLoading is false
  //   if (distanceToBottom < 1 && !isLoading) {
  //     fetchRes();
  //   }
  // };

  // useEffect(() => {
  //   const scrollableElement = document.documentElement; // Use the scrollable container element
  //   scrollableElement.addEventListener("scroll", handleScroll);

  //   // Clean up the event listener when the component is unmounted
  //   return () => {
  //     scrollableElement.removeEventListener("scroll", handleScroll);
  //   };
  // }, [isLoading]);

  const handleSearchQuery = (query: string) => {
    setSearchQuery(query);
  };

  return (
    <>
      <Navbar />
      <Banner />
      <SearchBar handleSearch={handleSearchQuery} />
      <section className="bg-gray-50 dark:bg-gray-900 py-10 px-12">
        <div className="grid grid-flow-row gap-4 text-neutral-600 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
          {isLoading ? (
            Array.from({ length: 8 }).map((_, index) => (
              <ShimmerCard key={index} />
            ))
          ) : (
            <>
              {data.length ? (
                <>
                  {data?.map((res: RestaurantInterface) => (
                    <CardsList {...res} key={res._id} />
                  ))}
                </>
              ) : (
                <NoRestaurantFound />
              )}
            </>
          )}
        </div>
      </section>
      <Footer />
    </>
  );
};

export default Home;
