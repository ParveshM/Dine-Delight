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
import NotFoundPage from "../components/Error404";

const Home: React.FC = () => {
  // use Query for caching the data fetched on home page
  const { isLoading, data } = useQuery(
    "restaurants",
    () => axios.get(USER_API + "/restaurants"),
    {
      refetchOnWindowFocus: false,
      select: (data) => {
        return data?.data?.restaurants ?? [];
      },
    }
  );

  console.log(isLoading);

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
              {data?.map((res: RestaurantInterface) => (
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
