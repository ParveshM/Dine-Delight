import { useCallback, useEffect, useState } from "react";
import axiosJWT from "../../../utils/axiosService";
import { RESTAURANT_API } from "../../../constants";
import showToast from "../../../utils/toaster";
import TableRowData from "../../../components/restaurant/Table/tableRowItem";
import Button from "../../../components/restaurant/Button";
import AddTableModal from "../../../components/restaurant/Table/Modal/AddTableModal";

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
