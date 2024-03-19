import { useEffect, useState } from "react";
import axiosJWT from "../utils/axiosService";

import { ADMIN_API } from "../constants";
import { RestaurantInterface } from "../types/RestaurantInterface";

const useRestaurant = () => {
  const [restaurants, setRestaurants] = useState<RestaurantInterface[]>([]);
  const [filteredRestaurants, setFilteredRestaurants] = useState<
    RestaurantInterface[]
  >([]);

  useEffect(() => {
    axiosJWT
      .get(ADMIN_API + "/restaurants")
      .then(({ data }) => {
        setRestaurants(data.restaurants);
        setFilteredRestaurants(data.restaurants);
      })
      .catch((error: any) => console.log(error));
  }, [setRestaurants]);

  return {
    restaurants,
    setRestaurants,
    filteredRestaurants,
    setFilteredRestaurants,
  };
};

export default useRestaurant;
