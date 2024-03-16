import { CalendarCheck } from "lucide-react";
import { ImSpinner } from "react-icons/im";
import { ChangeEvent, useState } from "react";
import {
  TimeSlotInterface,
  TableSlotInterface,
} from "../../../types/RestaurantInterface";
import { useParams, useNavigate } from "react-router-dom";
import axiosJWT from "../../../utils/axiosService";
import { RESTAURANT_API } from "../../../constants";
import showToast from "../../../utils/toaster";
import { formatDate } from "../../../utils/formatDate";
import Button from "../Button";

interface AddTableSlotModalProps {
  setIsModalOpen: (isOpen: boolean) => void;
  addNewSlot: (newSlot: TableSlotInterface) => void;
  timeSlots: TimeSlotInterface[];
}
const AddTableSlotModal: React.FC<AddTableSlotModalProps> = ({
  setIsModalOpen,
  addNewSlot,
  timeSlots,
}) => {
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [error, setError] = useState<{ selectTime?: string } | null>(null);
  const navigate = useNavigate();
  const { id } = useParams();

  const [formData, setFormData] = useState({
    tableId: id ?? "",
    slotDate: "",
    selectTime: "",
    startTime: "",
    endTime: "",
  });
  const handleChange = (
    e: ChangeEvent<HTMLSelectElement | HTMLInputElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const selectTime = form.get("selectTime")?.toString() ?? "";
    if (!selectTime.length) {
      setError({ selectTime: "Please select a time" });
    } else {
      setError(null);
      setIsSubmitting(true);
    }

    const [startTime, endTime] = selectTime.split("-");
    form.append("startTime", startTime);
    form.append("endTime", endTime);
    form.append("tableId", formData.tableId);

    let data: Record<string, string> = {};
    for (let [key, value] of form.entries()) {
      if (typeof value === "string") {
        data[key] = value;
      }
    }
    axiosJWT
      .post(RESTAURANT_API + "/allot_tableSlot", data)
      .then(({ data }) => {
        addNewSlot(data.newSlot);
        showToast(data.message);
        setIsModalOpen(false);
      })
      .catch(({ response }) => {
        showToast(response.data.message, "error");
        setIsSubmitting(false);
      });
  }

  return (
    <div
      tabIndex={-1}
      aria-hidden="true"
      className="fixed inset-0 z-50 overflow-y-auto bg-gray-500 bg-opacity-50 flex justify-center items-center "
    >
      <div className="relative bg-white rounded-lg shadow-lg max-w-md w-full mx-3">
        <div className="flex items-center justify-between p-4 border-b">
          <h3 className="text-lg font-semibold text-gray-900 inline-flex items-center gap-2">
            Add table Slot <CalendarCheck className="text-orange-400" />
          </h3>
          <button
            type="button"
            className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto flex justify-center items-center"
            onClick={() => setIsModalOpen(false)}
          >
            <svg
              className="w-3 h-3"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 14 14"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
              />
            </svg>
            <span className="sr-only">Close modal</span>
          </button>
        </div>
        <form className="p-4 md:p-5" onSubmit={handleSubmit}>
          <div className="grid gap-4 mb-4 grid-cols-4">
            <div className="col-span-2">
              <label
                htmlFor="Slot Date"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Slot Date
              </label>
              <input
                type="date"
                name="slotDate"
                value={formData.slotDate}
                min={formatDate(new Date())}
                onChange={handleChange}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg outline-none block w-full p-2.5 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white "
                required
              />
            </div>
            <div className="col-span-2 ">
              <label
                htmlFor="
                slot time"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Slot Time
              </label>
              {!timeSlots.length ? (
                <Button
                  label="Add time Slot"
                  handleButtonclick={() => navigate("/restaurant/time_slots")}
                />
              ) : (
                <>
                  <select
                    name="selectTime"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 focus:outline-none block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    onChange={handleChange}
                  >
                    {timeSlots.map((time) => (
                      <option
                        value={`${time.startTime} - ${time.endTime}`}
                        key={time._id}
                      >
                        {time.startTime} - {time.endTime}
                      </option>
                    ))}
                  </select>
                  {error?.selectTime && (
                    <p className="text-red-500">{error?.selectTime}</p>
                  )}
                </>
              )}
            </div>
          </div>

          <button
            className="text-white w-full  bg-green-500 hover:bg-green-600
           focus:ring-green-400 focus:ring-2 focus:outline-none  font-medium rounded-lg
           text-sm px-5 py-2.5 text-center"
            type="submit"
          >
            {isSubmitting ? (
              <span className="inline-flex items-center gap-2">
                <ImSpinner className="animate-spin mx-auto" />
                Adding
              </span>
            ) : (
              "Add"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddTableSlotModal;
