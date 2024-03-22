import { useEffect, useState } from "react";
import axiosJWT from "../utils/axiosService";

import { ADMIN_API } from "../constants";
import { newRestaurantInterface } from "../types/RestaurantInterface";

const useNewRegistrations = () => {
  const [newRestaurants, setNewRestaurants] = useState<
    newRestaurantInterface[]
  >([]);
  const [filteredRegistration, setFilteredRegistration] = useState<
    newRestaurantInterface[]
  >([]);

  useEffect(() => {
    axiosJWT
      .get(ADMIN_API + "/restaurants?new_registrations=true")
      .then(({ data }) => {
        setNewRestaurants(data.restaurants);
        setFilteredRegistration(data.restaurants);
      })
      .catch((error: any) => console.log(error));
  }, [setNewRestaurants]);

  return {
    newRestaurants,
    setNewRestaurants,
    filteredRegistration,
    setFilteredRegistration,
  };
};

export default useNewRegistrations;
