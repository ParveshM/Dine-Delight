import { useFormik } from "formik";
import { ChevronDown } from "lucide-react";
import { useEffect, useState } from "react";
import { IoClose } from "react-icons/io5";
import {
  BannerInterface,
  RestaurantInterface,
} from "../../types/RestaurantInterface";
import axiosJWT from "../../utils/axiosService";
import { ADMIN_API, CLOUDNAME, cloudinaryUploadPreset } from "../../constants";
import CloudinaryUploadWidget from "../../redux/Context/UploadwidgetContext";
import showToast from "../../utils/toaster";

interface BannerModalProps {
  setModalOpen: (isOpen: boolean) => void;
  handleAddedBanner: (bannerdata: BannerInterface) => void;
}
const BannerModal: React.FC<BannerModalProps> = ({
  setModalOpen,
  handleAddedBanner,
}) => {
  const [restaurants, setRestaurants] = useState<RestaurantInterface[]>([]);
  const [imageUrl, setImageUrl] = useState<string>("");
  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
      image: "",
    },
    onSubmit: (values) => {
      formik.values.image = imageUrl;
      axiosJWT
        .post(ADMIN_API + "/banners/add", values)
        .then(({ data }) => {
          handleAddedBanner(data.newBanner);
          setModalOpen(false);
        })
        .catch(() => showToast("Oops! Something went wrong", "error"));
    },
  });

  useEffect(() => {
    axiosJWT
      .get(ADMIN_API + "/restaurants", { params: { page: 1, limit: 0 } })
      .then(({ data }) => {
        setRestaurants(data.restaurants);
      })
      .catch(() => null);
  }, []);
  return (
    <div
      className={`fixed inset-0 z-50 overflow-y-auto bg-gray-500 bg-opacity-50 flex justify-center items-center `}
    >
      <div className="relative bg-white rounded-lg shadow-lg max-w-md w-full mx-2">
        <div className="flex items-center justify-between p-4 border-b">
          <h3 className="text-lg font-semibold text-gray-900">Add Banner</h3>
          <button
            type="button"
            className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto flex justify-center items-center"
            onClick={() => setModalOpen(false)}
          >
            <IoClose className="w-6 h-6" />
          </button>
        </div>
        <div className="p-4 md:p-5">
          <form
            className="grid  grid-cols-2 gap-4 mb-4"
            onSubmit={formik.handleSubmit}
          >
            <div className="col-span-2">
              <label
                htmlFor="title"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Title
              </label>
              <input
                type="text"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg outline-none block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white "
                {...formik.getFieldProps("title")}
              />
              {formik.errors.title && (
                <p className="col-span-2 flex justify-center items-center text-red-500">
                  {formik.errors.title}
                </p>
              )}
            </div>
            <div className="col-span-2 ">
              <label
                htmlFor="description"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Description
              </label>
              <textarea
                rows={1}
                className="bg-gray-50 border border-gray-300 outline-none text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                {...formik.getFieldProps("description")}
              />
            </div>
            {formik.errors.description && (
              <p className="col-span-2 flex justify-center items-center text-red-500">
                {formik.errors.description}
              </p>
            )}
            <div className="relative col-span-2">
              <select
                className="block w-full appearance-none bg-white border border-gray-300 text-sm py-1 px-2 pr-8 rounded-md focus:outline-none focus:border-blue-500"
                {...formik.getFieldProps("restaurantUrl")}
              >
                <option>Select a restaurant</option>
                {restaurants.length ? (
                  <>
                    {restaurants.map((res) => (
                      <option value={res._id}>{res.restaurantName}</option>
                    ))}
                  </>
                ) : (
                  <option>No options available</option>
                )}
              </select>
              <div className="absolute top-1 right-0 flex items-center px-2 pointer-events-none">
                <ChevronDown />
              </div>
            </div>
            <div className="col-span-2 flex items-center gap-2">
              <p className="font-medium"> Upload images</p>
              <CloudinaryUploadWidget
                uwConfig={{
                  cloudName: CLOUDNAME,
                  uploadPreset: cloudinaryUploadPreset,
                  resourceType: "image",
                  cropping: true,
                  croppingCoordinatesMode: "custom",
                  croppingAspectRatio: 1.5,
                  croppingDefaultSelectionRatio: 100 / 100,
                  showSkipCropButton: false,
                  clientAllowedFormats: ["images"],
                }}
                setImageUrl={setImageUrl}
              />
              {imageUrl && (
                <img src={imageUrl} alt="" width={100} height={100} />
              )}
            </div>
            <div className="col-span-2">
              <button
                type="submit"
                className="text-white w-full bg-green-500 hover:bg-green-600 focus:ring-green-400 focus:ring-2 focus:outline-none  font-medium rounded-lg text-sm px-5 py-2 text-center"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default BannerModal;
