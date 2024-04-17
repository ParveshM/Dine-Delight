import { Filter } from "lucide-react";
import Button from "../../../components/restaurant/Button";
import TableSlotsData from "../../../components/restaurant/Table/TableSlotsData";
import useTableSlots from "../../../hooks/useTableSlots";
import { useState } from "react";
import AddTableSlotModal from "../../../components/restaurant/Table/Modal/AddTableSlotModal";
import Pagination from "../../../components/Pagination";
import { convertTimeFormat } from "../../../utils/timeConverter";
import { formatDate } from "../../../utils/util";

const ViewTable = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const {
    filter,
    tableSlot,
    setFilter,
    timeslots,
    pageSize,
    currentPage,
    itemsPerPage,
    isFilterOn,
    setIsFilterOn,
    setCurrentPage,
    handleAddedSlot,
    handleDeleteSlot,
    handleFilterInputChange,
  } = useTableSlots();

  return (
    <>
      <div className="flex justify-between mb-2 ">
        <h1 className="text-xl font-semibold ">Table Slots </h1>
        <Button
          label="Add Slots"
          className="bg-orange-400 hover:bg-orange-500"
          handleButtonclick={() => setIsModalOpen(true)}
        />
      </div>
      <div className="flex gap-2 mb-2 justify-center">
        <input
          type="date"
          name="date"
          value={formatDate(new Date(filter.date))}
          className="border border-gray-300 rounded-md px-2 py-1"
          onChange={handleFilterInputChange}
        />
        <input
          type="time"
          name="time"
          value={filter.time}
          className="border border-gray-300 rounded-md px-2 py-1"
          onChange={handleFilterInputChange}
        />
        <button
          className="py-1 inline-flex gap-2 px-3 rounded-md bg-gray-400 text-white font-semibold hover:bg-gray-500 transition duration-150"
          onClick={() => {
            setIsFilterOn(true);
          }}
        >
          Filter <Filter />
        </button>{" "}
        {isFilterOn && (filter.date.length || filter.time.length) ? (
          <button
            className="py-1 inline-flex gap-2 px-3 rounded-md bg-gray-400 text-white font-semibold hover:bg-gray-500 transition duration-150"
            onClick={() => {
              setFilter({ date: "", time: "" });
              setIsFilterOn(false);
            }}
          >
            clear
          </button>
        ) : null}
      </div>
      {tableSlot.length ? (
        <>
          <div className=" overflow-x-auto shadow-md sm:rounded-lg  custom-vh">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    SL:no
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Date
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Time
                  </th>
                  <th scope="col" className="px-6 py-3">
                    IsAvailable
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {tableSlot.map((item, index) => (
                  <TableSlotsData
                    {...item}
                    sl_no={index + 1}
                    key={item._id}
                    handleDeleteSlot={handleDeleteSlot}
                  />
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
        <div className="flex gap-2 justify-center">
          <h1 className="text-xl font-semibold ">No Slot available </h1>
          {/* <Button
            label="Add Slots"
            className="bg-orange-400 hover:bg-orange-500"
            handleButtonclick={() => setIsModalOpen(true)}
          /> */}
        </div>
      )}
      {isModalOpen && (
        <AddTableSlotModal
          setIsModalOpen={setIsModalOpen}
          addNewSlot={handleAddedSlot}
          timeSlots={timeslots}
        />
      )}
    </>
  );
};

export default ViewTable;
