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
const Home: React.FC = () => {
  const [restaurant, setRestaurant] = useState<RestaurantInterface[]>();
  const [isLoading, setIsLoading] = useState<boolean>();

  useEffect(() => {
    axios
      .get(USER_API + "/restaurants")
      .then(({ data }) => {
        setRestaurant(data.restaurants);
        setTimeout(() => setIsLoading(false), 1000);
      })
      .catch((error) => console.error(error));
  }, []);

  return (
    <>
      <Navbar />
      <Banner />
      <SearchBar />
      <section className="bg-gray-50 dark:bg-gray-900 py-10 px-12">
        <div className="grid grid-flow-row gap-4 text-neutral-600 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
          {isLoading ? (
            Array.from({ length: 8 }).map((_, index) => (
              <ShimmerCard key={index} />
            ))
          ) : (
            <>
              {restaurant?.map((res) => (
                <CardsList {...res} key={res._id} />
              ))}
              {restaurant?.map((res) => (
                <CardsList {...res} key={res._id} />
              ))}
            </>
          )}
        </div>
      </section>
      <Footer />
    </>
  );
};

export default Home;
