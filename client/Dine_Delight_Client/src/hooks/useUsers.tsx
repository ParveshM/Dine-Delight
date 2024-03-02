import { useEffect, useState } from "react";
import axiosJWT from "../utils/axiosService";
import { UserInterface } from "../types/UserInterface";
import { ADMIN_API } from "../constants";

const useUsers = () => {
  const [users, setUsers] = useState<UserInterface[]>([]);

  useEffect(() => {
    axiosJWT
      .get(ADMIN_API + "get_allUsers")
      .then(({ data }) => setUsers(data.users))
      .catch((error: any) => console.log(error));
  });

  return { users };
};

export default useUsers;
