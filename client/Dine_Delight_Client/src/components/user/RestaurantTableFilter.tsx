import { TableSlotInterface } from "../../types/RestaurantInterface";
import { formatDate } from "../../utils/util";
import Button from "../restaurant/Button";

interface TableSlotFilterProps {
  tableSlots: TableSlotInterface[];
  setTableSlot: (slots: TableSlotInterface[]) => void;
}

const TableSlotFilter: React.FC<TableSlotFilterProps> = ({
  tableSlots,
  setTableSlot,
}) => {
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    console.log(e.target.value);
  };
  return (
    <>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mx-auto mt-8 bg-white min-w-sm max-w-2xl flex flex-wrap justify-evenly items-center border py-1 px-2 rounded-3xl shadow-md focus-within:border-gray-300">
          <div className="flex flex-col justify-center items-center gap-1 ">
            <label htmlFor="guests" className="font-semibold">
              No of guests
            </label>
            <select
              className="py-2 px-6 rounded-xl hover:bg-slate-100"
              onChange={handleInputChange}
            >
              <option value={2}>2 guests</option>
              <option value={4}>4 guests</option>
              <option value={6}>6 guests</option>
            </select>
          </div>

          <div className="flex flex-col justify-center items-center gap-1">
            <label htmlFor="date" className="font-semibold ">
              Date
            </label>

            <input
              type="date"
              id="date"
              placeholder="Date"
              name="date"
              min={formatDate(new Date())}
              onChange={handleInputChange}
              className="py-2 px-6  hover:bg-slate-100 w-full rounded-xl outline-none bg-white "
            />
          </div>

          <div className="flex flex-col justify-center items-center gap-1">
            <label htmlFor="time" className="font-semibold    ">
              Time
            </label>

            <input
              type="time"
              id="time"
              placeholder="Time"
              name="time"
              onChange={handleInputChange}
              className="py-2 px-6  hover:bg-slate-100 w-full rounded-xl outline-none bg-white"
            />
          </div>
        </div>
      </div>
      <div className=" mx-auto gap-2 mt-4">
        {!tableSlots.length ? (
          <h1>No slots availbale </h1>
        ) : (
          <>
            {tableSlots.map((slot) => (
              <Button
                label={slot.startTime}
                className="bg-blue-500 hover:bg-blue-600 m-1"
                handleButtonclick={() => ""}
                key={slot._id}
              />
            ))}
          </>
        )}
      </div>
    </>
  );
};
export default TableSlotFilter;
