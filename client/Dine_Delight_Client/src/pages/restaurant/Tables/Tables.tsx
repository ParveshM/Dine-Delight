import { useCallback, useEffect, useState } from "react";
import axiosJWT from "../../../utils/axiosService";
import { RESTAURANT_API } from "../../../constants";
import showToast from "../../../utils/toaster";
import TableRowData from "../../../components/restaurant/Table/tableRowItem";
import Button from "../../../components/restaurant/Button";
import AddTableModal from "../../../components/restaurant/Table/AddTableModal";

export interface TableDataInterface {
  _id: string;
  tableNumber: string;
  capacity: number;
  location: string;
}

const Tables = () => {
  const [tableData, setTableData] = useState<TableDataInterface[]>([]);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  useEffect(() => {
    axiosJWT
      .get(RESTAURANT_API + "/tables")
      .then(({ data }) => {
        setTableData(data.tables);
      })
      .catch(() =>
        showToast("Oops! Something went wrong while fetching tables", "error")
      );
  }, []);

  const newTableData = (newTable: TableDataInterface) => {
    console.log(newTable);
    setTableData((curr) => [...curr, newTable]);
  };

  return (
    <>
      <div className="flex justify-between mb-2 ">
        <h1 className="text-xl font-semibold ">Tables </h1>
        <Button
          label="Add Table"
          className="bg-orange-400 hover:bg-orange-500"
          handleButtonclick={() => setIsModalOpen(true)}
        />
      </div>
      <div className=" overflow-x-auto shadow-md sm:rounded-lg h-screen ">
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

        {/* 
          Pagination section
        <section
          className="flex items-center flex-column flex-wrap md:flex-row justify-center pt-4 mb-2 "
          aria-label="Table navigation"
        >
          <ul className="inline-flex -space-x-px rtl:space-x-reverse text-sm h-8">
            <li>
              <a
                href="#"
                className="flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
              >
                Previous
              </a>
            </li>
            <li>
              <a
                href="#"
                className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
              >
                1
              </a>
            </li>
            <li>
              <a
                href="#"
                className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
              >
                2
              </a>
            </li>
            <li>
              <a
                href="#"
                aria-current="page"
                className="flex items-center justify-center px-3 h-8 text-blue-600 border border-gray-300 bg-blue-50 hover:bg-blue-100 hover:text-blue-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white"
              >
                3
              </a>
            </li>
            <li>
              <a
                href="#"
                className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
              >
                4
              </a>
            </li>
            <li>
              <a
                href="#"
                className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
              >
                5
              </a>
            </li>
            <li>
              <a
                href="#"
                className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
              >
                Next
              </a>
            </li>
          </ul>
        </section> */}

        {isModalOpen && (
          <AddTableModal
            setIsModalOpen={setIsModalOpen}
            addNewTable={newTableData}
          />
        )}
      </div>
    </>
  );
};

export default Tables;
