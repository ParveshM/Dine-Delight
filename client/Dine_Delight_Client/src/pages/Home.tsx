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

const Home: React.FC = () => {
  // use Query for caching the data fetched on home page
  const { location } = useAppSelector((state) => state.LocationSlice);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const { isLoading, data } = useQuery(
    ["restaurants", searchQuery, location.coordinates],
    async () => {
      const response = await axios.get(USER_API + "/restaurants", {
        params: { q: searchQuery, location: location.coordinates },
      });
      return response.data?.restaurants ?? [];
    }
  );

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
