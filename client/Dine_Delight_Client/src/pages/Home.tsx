import Banner from "../components/user/Banner";
import CardsList from "../components/user/Cards/CardsList";
import Navbar from "../components/user/Header/Navbar";
import SearchBar from "../components/user/SearchBar";
import { RestaurantInterface } from "../types/RestaurantInterface";
import Footer from "../components/user/Footer/Footer";
import ShimmerCard from "../components/shimmers/ShimmerCard";
import NoRestaurantFound from "../components/NoItemFound";
import useRestaurantList from "../hooks/useRestaurantList";
import { useCallback, useRef } from "react";

const Home: React.FC = () => {
  const {
    data,
    isLoading,
    isLoadingMore,
    hasMore,
    filter,
    setPage,
    handleFilter,
    handleRemoveFilter,
    handleSearchQuery,
  } = useRestaurantList();
  // Infinite scrolling with pagination and intersectionObserver
  const observer = useRef<IntersectionObserver>();
  const lastRestaurantRef = useCallback(
    (node: HTMLDivElement | null) => {
      if (isLoading || isLoadingMore) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setPage((prev) => prev + 1);
        }
      });
      if (node) observer.current.observe(node);
    },
    [isLoading, isLoadingMore, hasMore]
  );

  return (
    <>
      <Navbar />
      <Banner />
      <SearchBar
        handleSearch={handleSearchQuery}
        appliedFilters={filter}
        setFilter={handleFilter}
        handleRemoveFilter={handleRemoveFilter}
      />
      <section className="bg-gray-50 dark:bg-gray-900 py-10 px-12 ">
        <div className="grid grid-flow-row gap-4 text-neutral-600 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
          {isLoading ? (
            Array.from({ length: 8 }).map((_, index) => (
              <ShimmerCard key={index} />
            ))
          ) : (
            <>
              {data.length ? (
                <>
                  {data?.map((res: RestaurantInterface, index) => {
                    if (data.length === index + 1) {
                      return (
                        <CardsList
                          {...res}
                          key={res._id}
                          ref={lastRestaurantRef}
                        />
                      );
                    } else {
                      return <CardsList {...res} key={res._id} />;
                    }
                  })}
                </>
              ) : (
                <NoRestaurantFound />
              )}
            </>
          )}
          {isLoadingMore &&
            Array.from({ length: 3 }).map((_, index) => (
              <ShimmerCard key={index} />
            ))}
        </div>
      </section>
      <Footer />
    </>
  );
};

export default Home;
