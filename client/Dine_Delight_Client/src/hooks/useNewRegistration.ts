import { useEffect, useState } from "react";
import axiosJWT from "../utils/axiosService";

import { ADMIN_API } from "../constants";
import { newRestaurantInterface } from "../types/RestaurantInterface";
import usePaginateState from "./usePaginateState";

const useNewRegistrations = () => {
  const [newRestaurants, setNewRestaurants] = useState<
    newRestaurantInterface[]
  >([]);
  const [filteredRegistration, setFilteredRegistration] = useState<
    newRestaurantInterface[]
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
      .get(ADMIN_API + "/restaurants?new_registrations=true", {
        params: { page: currentPage },
      })
      .then(({ data }) => {
        const { restaurants, count, limit } = data;
        setNewRestaurants(restaurants);
        setFilteredRegistration(restaurants);
        setItemsPerPage(limit);
        setPageSize(count);
      })
      .catch((error: any) => console.log(error));
  }, [setNewRestaurants, currentPage]);

  return {
    newRestaurants,
    setNewRestaurants,
    filteredRegistration,
    setFilteredRegistration,
    setCurrentPage,
    currentPage,
    pageSize,
    itemsPerPage,
  };
};

export default useNewRegistrations;
