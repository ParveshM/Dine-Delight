import { useSearchParams } from "react-router-dom";
import {
  RestaurantInterface,
  TableSlotInterface,
} from "../../../types/RestaurantInterface";
import { formatDate } from "../../../utils/util";
import Button from "../../restaurant/Button";
import React, { useEffect, useState } from "react";
import { USER_API } from "../../../constants";
import axios from "axios";
import LoadingAnimation from "../LoadingAnimation";
import ReservationModal from "../Modals/ReservationModal";
interface TableSlotFilterProps {
  restaurantInfo: RestaurantInterface;
  tableSlots: TableSlotInterface[];
  // dateSlots: TableSlotInterface[];
  setTableSlot: (slots: TableSlotInterface[]) => void;
}

const TableSlotFilter: React.FC<TableSlotFilterProps> = ({
  restaurantInfo,
  tableSlots,
  setTableSlot,
}) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedSlot, setSelectedSlot] = useState<TableSlotInterface | null>(
    null
  );

  const [inputData, setInputData] = useState({
    date: formatDate(new Date()),
    guest: 2,
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setInputData((prev) => ({ ...prev, [name]: value }));
    const currentParams = Object.fromEntries(searchParams.entries());
    setSearchParams({ ...currentParams, [name]: value });
  };
  const queryObject = Object.fromEntries(searchParams.entries());
  const queryString = new URLSearchParams(queryObject).toString();
  useEffect(() => {
    if (queryString.length) {
      setIsLoading(true);
      axios
        .get(USER_API + `/restaurants/${restaurantInfo._id}?${queryString}`)
        .then(({ data }) => {
          setTimeout(() => {
            setTableSlot(data.tableSlots);
            setIsLoading(false);
          }, 1000);
        })
        .catch(() => {
          setIsLoading(false);
          console.error("Page not found");
        });
    }
    return () => setIsModalOpen(false);
  }, [searchParams]);

  const handleTableSlotButtonClick = (slotData: TableSlotInterface) => {
    setIsModalOpen(true);
    setSelectedSlot(slotData);
  };

  return (
    <>
      {isModalOpen && (
        <ReservationModal
          setIsModalOpen={setIsModalOpen}
          selectedSlot={selectedSlot}
          restaurant={restaurantInfo}
        />
      )}

      <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
        <div className="mx-auto mt-8 bg-white min-w-sm max-w-2xl rounded-3xl shadow-md focus-within:border-gray-300">
          <div className="grid grid-cols-2 border rounded-3xl">
            <div className="flex flex-col justify-evenly items-center border-r rounded-l-xl  hover:bg-slate-100">
              <label htmlFor="guests" className="font-semibold py-2">
                No of guests
              </label>
              <select
                name="guest"
                className="py-2 px-6 bg-transparent outline-none appearance-none"
                onChange={handleInputChange}
              >
                <option value={2}>2 guests</option>
                <option value={4}>4 guests</option>
                <option value={6}>6 guests</option>
              </select>
            </div>

            <div className="flex flex-col justify-center items-center rounded-r-xl hover:bg-slate-100">
              <label htmlFor="date" className="font-semibold py-2">
                Date
              </label>
              <input
                type="date"
                placeholder="Date"
                name="date"
                value={inputData.date}
                min={formatDate(new Date())}
                onChange={handleInputChange}
                className="py-2 px-6 bg-transparent outline-none"
              />
            </div>
          </div>
        </div>
      </div>
      <div>{}</div>
      <div className="mx-auto md:mx-10  mt-4">
        {isLoading ? (
          <LoadingAnimation />
        ) : (
          <>
            {tableSlots.length ? (
              <>
                {tableSlots.map((slot) => {
                  return (
                    <Button
                      label={slot.startTime ?? ""}
                      className="bg-blue-500 hover:bg-blue-600 m-1"
                      handleButtonclick={() => handleTableSlotButtonClick(slot)}
                      key={slot._id}
                    />
                  );
                })}
              </>
            ) : (
              <>
                <div className="text-center mt-10">
                  <h1 className="text-2xl font-semibold text-gray-700 mb-4">
                    No slots available
                  </h1>
                  <p className="text-gray-500">
                    Please try again later or contact support.
                  </p>
                </div>
              </>
            )}
          </>
        )}
      </div>
    </>
  );
};
export default TableSlotFilter;
