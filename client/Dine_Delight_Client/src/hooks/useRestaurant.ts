import { useEffect, useState } from "react";
import axiosJWT from "../utils/axiosService";

import { ADMIN_API } from "../constants";
import { RestaurantInterface } from "../types/RestaurantInterface";
import usePaginateState from "./usePaginateState";

const useRestaurant = () => {
  const [restaurants, setRestaurants] = useState<RestaurantInterface[]>([]);
  const [filteredRestaurants, setFilteredRestaurants] = useState<
    RestaurantInterface[]
  >([]);
  const {
    currentPage,
    setCurrentPage,
    pageSize,
    setPageSize,
    itemsPerPage,
    setItemsPerPage,
  } = usePaginateState();

  useEffect(() => {
    axiosJWT
      .get(ADMIN_API + "/restaurants", { params: { page: currentPage } })
      .then(({ data }) => {
        const { restaurants, count, limit } = data;
        setRestaurants(restaurants);
        setFilteredRestaurants(restaurants);
        setItemsPerPage(limit);
        setPageSize(count);
      })
      .catch((error: any) => console.log(error));
  }, [setRestaurants, currentPage]);

  return {
    restaurants,
    setRestaurants,
    filteredRestaurants,
    setFilteredRestaurants,
    setCurrentPage,
    currentPage,
    pageSize,
    itemsPerPage,
  };
};

export default useRestaurant;
