import { useEffect, useState } from "react";
import axiosJWT from "../../../utils/axiosService";
import { RESTAURANT_API } from "../../../constants";
import showToast from "../../../utils/toaster";
import TableRowData from "../../../components/restaurant/Table/tableRowItem";
import Button from "../../../components/restaurant/Button";
import AddTableModal from "../../../components/restaurant/Modal/AddTableModal";
import usePaginateState from "../../../hooks/usePaginateState";
import Pagination from "../../../components/Pagination";

export interface TableDataInterface {
  _id: string;
  tableNumber: string;
  capacity: number;
  location: string;
}

const Tables = () => {
  const [tableData, setTableData] = useState<TableDataInterface[]>([]);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
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
      .get(RESTAURANT_API + "/tables", {
        params: {
          page: currentPage,
        },
      })
      .then(({ data }) => {
        const { tables, count, limit } = data;
        setTableData(tables);
        setPageSize(count);
        setItemsPerPage(limit);
      })
      .catch(() =>
        showToast("Oops! Something went wrong while fetching tables", "error")
      );
  }, [currentPage]);

  const newTableData = (newTable: TableDataInterface) => {
    setTableData((curr) => [...curr, newTable]);
  };

  return (
    <>
      {tableData.length ? (
        <>
          <div className="flex justify-between mb-2 ">
            <h1 className="text-xl font-semibold ">Tables </h1>
            <Button
              label="Add Table"
              className="bg-orange-400 hover:bg-orange-500"
              handleButtonclick={() => setIsModalOpen(true)}
            />
          </div>
          <div className=" overflow-x-auto shadow-md sm:rounded-lg custom-vh">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    SL:no
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Table number
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Capacity
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Location
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {tableData.map((item, index) => (
                  <TableRowData {...item} sl_no={index + 1} key={item._id} />
                ))}
              </tbody>
            </table>
            <Pagination
              currentPage={currentPage}
              totalCount={pageSize}
              itemsPerPage={itemsPerPage} //items per page
              onPageChange={(page) => setCurrentPage(page)}
            />
          </div>
        </>
      ) : (
        <div className="flex gap-2 ">
          <h1 className="text-xl font-semibold ">No tables available </h1>
          <Button
            label="Add Table"
            className="bg-orange-400 hover:bg-orange-500"
            handleButtonclick={() => setIsModalOpen(true)}
          />
        </div>
      )}{" "}
      {isModalOpen && (
        <AddTableModal
          setIsModalOpen={setIsModalOpen}
          addNewTable={newTableData}
        />
      )}
    </>
  );
};

export default Tables;
