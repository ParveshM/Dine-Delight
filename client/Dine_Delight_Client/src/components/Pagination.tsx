import { usePagination } from "../hooks/usePagination";

type PaginationPropsType = {
  onPageChange: (page: number) => void;
  totalCount: number;
  siblingCount?: number;
  currentPage: number;
  itemsPerPage?: number;
};

const Pagination: React.FC<PaginationPropsType> = ({
  onPageChange,
  totalCount,
  siblingCount = 1,
  currentPage,
  itemsPerPage = 5,
}) => {
  const paginationRange = usePagination({
    currentPage,
    totalCount,
    siblingCount,
    itemsPerPage,
  });

  const onNext = () => {
    onPageChange(currentPage + 1);
  };

  const onPrevious = () => {
    onPageChange(currentPage - 1);
  };

  if (currentPage === 0 || paginationRange.length < 2) {
    return null;
  }
  let lastPage = paginationRange[paginationRange.length - 1];
  return (
    <nav
      className="flex items-center flex-column flex-wrap md:flex-row justify-center pt-4 mb-2 "
      aria-label="Table navigation"
    >
      <ul className="inline-flex -space-x-px rtl:space-x-reverse text-sm h-8 cursor-pointer ">
        <li
          onClick={onPrevious}
          className={` ${
            currentPage === 1 && "pointer-events-none"
          } flex items-center justify-center px-3 h-8 ms-0 leading-tight
             text-gray-500 bg-white border border-gray-300 rounded-s-lg hover:bg-gray-100
              hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400
               dark:hover:bg-gray-700 dark:hover:text-white`}
          key={"previos"}
        >
          Previous
        </li>

        {paginationRange.map((pageNumber, index) => {
          if (pageNumber === "DOTS") {
            return (
              <li
                className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500
               bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800
                dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                key={index}
              >
                &#8230;
              </li>
            );
          }
          return (
            <li
              onClick={() => onPageChange(pageNumber as number)}
              className={`flex items-center justify-center px-3 h-8 leading-tight text-gray-500
                  border border-gray-300 hover:bg-gray-100 hover:text-gray-700
                  dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700
                   dark:hover:text-white ${
                     pageNumber === currentPage
                       ? "bg-gray-100 font-bold text-gray-600"
                       : "bg-white"
                   }`}
              key={index}
            >
              {pageNumber}
            </li>
          );
        })}
        <li
          onClick={onNext}
          className={` ${
            currentPage === lastPage && "pointer-events-none cursor-not-allowed"
          } flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border
             border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700
              dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white rounded-r-md`}
          key={"next"}
        >
          Next
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;
