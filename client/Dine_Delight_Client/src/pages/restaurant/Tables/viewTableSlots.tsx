import { Filter } from "lucide-react";
import Button from "../../../components/restaurant/Button";
import TableSlotsData from "../../../components/restaurant/Table/TableSlotsData";
import useTableSlots from "../../../hooks/useTableSlots";
import { useState } from "react";
import AddTableSlotModal from "../../../components/restaurant/Table/Modal/AddTableSlotModal";
import { TableSlotInterface } from "../../../types/RestaurantInterface";
import axiosJWT from "../../../utils/axiosService";
import { RESTAURANT_API } from "../../../constants";
import showToast from "../../../utils/toaster";

const ViewTable = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const { tableSlot, timeslots, setTableSlot } = useTableSlots();

  const handleAddedSlot = (newSlotData: TableSlotInterface) =>
    setTableSlot((curr) => [...curr, newSlotData]);

  const handleDeleteSlot = (id: string) => {
    axiosJWT
      .delete(RESTAURANT_API + `/table_slots/${id}`)
      .then(({ data }) => {
        showToast(data.message);
        const filteredSlots = tableSlot.filter((slot) => slot._id !== id);
        setTableSlot(filteredSlots);
      })
      .catch(() =>
        showToast("Oops! Something went wrong while deleting slot", "error")
      );
  };
  return (
    <>
      {tableSlot.length ? (
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
              className="border border-gray-300 rounded-md px-2 py-1"
            />
            <input
              type="time"
              className="border border-gray-300 rounded-md px-2 py-1"
            />
            <button
              className="py-1 inline-flex gap-2 px-3 rounded-md bg-gray-400 text-white font-semibold hover:bg-gray-500 transition duration-150"
              onClick={() => console.log("")}
            >
              Filter <Filter />
            </button>
          </div>
          <div className=" overflow-x-auto shadow-md sm:rounded-lg h-screen ">
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
          </div>
        </>
      ) : (
        <div className="flex gap-2 ">
          <h1 className="text-xl font-semibold ">No Slot available </h1>
          <Button
            label="Add Slots"
            className="bg-orange-400 hover:bg-orange-500"
            handleButtonclick={() => setIsModalOpen(true)}
          />
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
