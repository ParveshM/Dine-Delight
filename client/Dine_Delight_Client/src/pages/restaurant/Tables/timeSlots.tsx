import { useEffect, useState } from "react";
import axiosJWT from "../../../utils/axiosService";
import { RESTAURANT_API } from "../../../constants";
import { TimeSlotInterface } from "../../../types/RestaurantInterface";
import SlotItem from "../../../components/restaurant/timeSlotList";
import { validateTimeRange } from "../../../utils/validation";
import showToast from "../../../utils/toaster";
import { convert24HourTime } from "../../../utils/timeConverter";

const TimeSlots = () => {
  const [slots, setSlots] = useState<TimeSlotInterface[]>([]);
  const [time, setTime] = useState<{ startTime: string; endTime: string }>({
    startTime: "09:00",
    endTime: "10:00",
  });

  useEffect(() => {
    axiosJWT
      .get(RESTAURANT_API + "/get_timeSlots")
      .then(({ data }) => setSlots(data.timeSlots))
      .catch((error) => console.log(error));
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setTime((curr) => ({ ...curr, [name]: value }));
  };

  const handleDeleteSlot = (slotId: string) => {
    axiosJWT
      .delete(RESTAURANT_API + `/delete_timeSlot/${slotId}`)
      .then(({ data }) => {
        showToast(data.message);
        const filterOutDeltedSlot = slots.filter((slot) => slot._id !== slotId);
        setSlots(filterOutDeltedSlot);
      })
      .catch(() => showToast("Oops! Something went wrong", "error"));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const isValidTime = validateTimeRange(time.startTime, time.endTime);
    if (isValidTime) {
      const startTime = convert24HourTime(time.startTime);
      const endTime = convert24HourTime(time.endTime);
      axiosJWT
        .post(RESTAURANT_API + "/add_timeSlot", { startTime, endTime })
        .then(({ data }) => {
          showToast(data.message);
          setSlots((prevSlots) => [...prevSlots, data.newTimeSlot]);
        })
        .catch(({ response }) => showToast(response.data.message, "error"));
    } else {
      showToast("Start time must be less than end time", "error");
    }
  };

  return (
    <div className=" p-4">
      <h1 className="text-2xl font-semibold ">Time Slots</h1>
      <div className="grid grid-cols-6 gap-4 ">
        <div className="col-span-6 sm:col-span-2 md:col-span-3 lg:col-span-2  rounded-lg mt-10">
          {!slots?.length ? (
            <p className="text-lg font-medium">No time slot added</p>
          ) : (
            slots?.map((slot) => (
              <SlotItem
                {...slot}
                handleDeleteSlot={handleDeleteSlot}
                key={slot._id}
              />
            ))
          )}
        </div>
        <div className="col-span-6 sm:col-span-2 md:col-span-3 lg:col-span-2">
          <div className="flex flex-col gap-4 items-center justify-between md:ml-20">
            <h2 className="text-lg font-semibold">Add New Slot</h2>
            <form onSubmit={handleSubmit} className="flex items-center mb-4">
              <input
                type="time"
                name="startTime"
                value={time.startTime}
                onChange={handleInputChange}
                className="border border-gray-300 p-2 rounded-md mr-2"
                required
              />

              <span>-</span>
              <input
                type="time"
                name="endTime"
                value={time.endTime}
                onChange={handleInputChange}
                className="border border-gray-300 p-2 rounded-md ml-2"
                required
              />
              <button
                type="submit"
                className="p-2 px-4 bg-blue-500 text-white rounded-md ml-2"
              >
                Add
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TimeSlots;
