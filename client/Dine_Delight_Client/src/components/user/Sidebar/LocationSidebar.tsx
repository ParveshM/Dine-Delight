import { ChangeEvent, useEffect, useState } from "react";
import AutoCompleteInput from "../../restaurant/AutoCompleteInput";
import { useAppDispatch } from "../../../redux/store/Store";
import {
  clearLocation,
  setLocation,
} from "../../../redux/slices/LocationSlice";

interface LocationSidebarProps {
  handleSidebarOpen: () => void;
}
const LocationSidebar: React.FC<LocationSidebarProps> = ({
  handleSidebarOpen,
}) => {
  const dispatch = useAppDispatch();

  const [formData, setformData] = useState({
    searchLocation: "",
    location: {
      type: "",
      coordinates: [],
    },
  });
  useEffect(() => {
    if (formData.location.coordinates.length) {
      dispatch(
        setLocation({
          location: {
            type: "Point",
            coordinates: formData.location.coordinates,
          },
        })
      );
    }
  }, [formData.location]);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) =>
    setformData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-50 z-[998]">
      <div
        className="fixed top-[72px] left-64 z-[999] w-64 h-screen p-4 overflow-y-auto transition-transform -translate-x-full bg-white bg-opacity-100 dark:bg-gray-800"
        tabIndex={-1}
        aria-labelledby="drawer-navigationLabel"
      >
        <h5
          id="drawer-navigationLabel"
          className="text-base font-semibold text-gray-500 uppercase dark:text-gray-400"
        >
          Search by location
        </h5>
        <button
          type="button"
          data-drawer-hide="drawer-navigation"
          aria-controls="drawer-navigation"
          onClick={handleSidebarOpen}
          className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 roundedLg text-sm p-1.5 absolute top-2.5 end-2.5 inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
        >
          <svg
            aria-hidden="true"
            className="w-5 h-5"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
              clipRule="evenodd"
            ></path>
          </svg>
          <span className="sr-only">Close menu</span>
        </button>
        <div className="p-2 overflow-y-auto">
          <AutoCompleteInput
            handleManualInputChange={handleInputChange}
            searchLocation={formData.searchLocation}
            setFormData={setformData}
          />
          <button
            className="px-3 py-2 font-medium bg-gray-200 text-gray-600 rounded hover:bg-gray-300"
            onClick={() => {
              dispatch(clearLocation());
              handleSidebarOpen();
            }}
          >
            Clear
          </button>
        </div>
      </div>
    </div>
  );
};

export default LocationSidebar;
