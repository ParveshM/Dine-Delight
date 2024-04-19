import { useEffect, useState } from "react";
import axiosJWT from "../utils/axiosService";
import { UserInterface } from "../types/UserInterface";
import { ADMIN_API } from "../constants";
import usePaginateState from "./usePaginateState";

const useUsers = () => {
  const [users, setUsers] = useState<UserInterface[]>([]);
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
      .get(ADMIN_API + "/users", {
        params: { page: currentPage },
      })
      .then(({ data }) => {
        const { users, count, limit } = data;
        setUsers(users);
        setPageSize(count);
        setItemsPerPage(limit);
      })
      .catch((error: any) => console.log(error));
  }, [setUsers, currentPage]);

  return {
    users,
    setUsers,
    setCurrentPage,
    currentPage,
    pageSize,
    itemsPerPage,
  };
};

export default useUsers;
