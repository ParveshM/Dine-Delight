import { useState } from "react";

export default function usePaginateState() {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(0);
  const [itemsPerPage, setItemsPerPage] = useState<number>(5);
  return {
    currentPage,
    setCurrentPage,
    pageSize,
    setPageSize,
    itemsPerPage,
    setItemsPerPage,
  };
}
