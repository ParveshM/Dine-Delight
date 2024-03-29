import { useEffect, useState } from "react";
import axios from "axios";
import { USER_API } from "../constants";
import { useAppSelector } from "../redux/store/Store";
import showToast from "../utils/toaster";
import { RestaurantInterface } from "../types/RestaurantInterface";

export type FilterType = {
  costPerPerson?: string | null;
  sortType?: string | null;
};
export default function useRestaurantList() {
  const { location } = useAppSelector((state) => state.LocationSlice);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [data, setData] = useState<RestaurantInterface[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isLoadingMore, setIsLoadingMore] = useState<boolean>(false);
  const [pageNumber, setPage] = useState<number>(1);
  const [filter, setFilter] = useState<FilterType>({
    costPerPerson: "",
    sortType: "",
  });
  // const [sortBy, setSortBy] = useState<"asc" | "desc">("asc");
  const [hasMore, setHasMore] = useState<boolean>(false);

  useEffect(() => {
    const fetchRestaurants = async () => {
      pageNumber > 1 ? setIsLoadingMore(true) : setIsLoading(true);
      try {
        const { data } = await axios.get(USER_API + "/restaurants", {
          params: {
            q: searchQuery,
            location: location.coordinates,
            page: pageNumber,
            cost: filter.costPerPerson,
            sort: filter.sortType,
            // sortOrder: "desc",
          },
        });
        setData((prev) => [...prev, ...data?.restaurants]);
        setHasMore(data.restaurants?.length > 0);
        pageNumber > 1 ? setIsLoadingMore(false) : setIsLoading(false);
      } catch (error) {
        showToast("Oops! Something went wrong", "error");
      }
    };
    fetchRestaurants();
  }, [searchQuery, pageNumber, location.coordinates, filter]);

  useEffect(() => {
    setData([]);
    setPage(1);
  }, [location.coordinates, searchQuery, filter]);

  const handleSearchQuery = (query: string) => {
    setSearchQuery(query);
  };

  const handleFilter = (filter: FilterType) => {
    setFilter((prev) => ({ ...prev, ...filter }));
  };

  return {
    data,
    isLoading,
    isLoadingMore,
    hasMore,
    setPage,
    filter,
    handleFilter,
    handleSearchQuery,
  };
}
