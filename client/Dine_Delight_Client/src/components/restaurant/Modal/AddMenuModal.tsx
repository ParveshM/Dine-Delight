import { useFormik } from "formik";
import { CookingPot } from "lucide-react";
import * as Yup from "yup";
import axiosJWT from "../../../utils/axiosService";
import { RESTAURANT_API } from "../../../constants";
import showToast from "../../../utils/toaster";
import { MenuItemInterface } from "../../../types/RestaurantInterface";
import useTagInput from "../../../hooks/useTagInput";
import { useEffect, useState } from "react";
import { IoClose } from "react-icons/io5";
import TagField from "../tagInputField";

const validationSchema = Yup.object().shape({
  name: Yup.string()
    .required("Name is required")
    .matches(
      /^[A-Z][a-zA-Z0-9\s-]+$/,
      "Name must start with a capital letter & no symbols"
    ),
  price: Yup.number()
    .required("Price is required")
    .min(1, "Enter a valid price"),
});

interface MenuModalProps {
  action: "Add" | "Edit";
  setIsModalOpen: (isOpen: boolean) => void;
  handleItemAdd?: (item: MenuItemInterface, action: "Add" | "Edit") => void;
  menuItem?: MenuItemInterface;
}

const AddMenuModal: React.FC<MenuModalProps> = ({
  action,
  setIsModalOpen,
  handleItemAdd,
  menuItem,
}) => {
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const { tags, setTags, handleAddTag, handleRemoveTag } = useTagInput();

  useEffect(() => {
    if (menuItem?.tags) setTags(menuItem?.tags);
  }, []);

  const formik = useFormik({
    initialValues: {
      name: menuItem?.name || "",
      price: menuItem?.price || "",
      isVegetarian: menuItem?.isVegetarian || false,
      category: menuItem?.category || "starters",
      tags: menuItem?.tags || [],
    },
    validationSchema,
    onSubmit: (values) => {
      values.tags = tags;
      setIsSubmitting(true);
      if (action === "Add") {
        axiosJWT
          .post(RESTAURANT_API + "/menu/add", values)
          .then(({ data }) => {
            handleItemAdd && handleItemAdd(data.menuItem, action);
            showToast(data.message);
            setIsModalOpen(false);
          })
          .catch(({ response }) => showToast(response.data.message, "error"))
          .finally(() => setIsSubmitting(false));
      } else {
        axiosJWT
          .put(RESTAURANT_API + `/menu/edit/${menuItem?._id}`, values)
          .then(({ data }) => {
            handleItemAdd && handleItemAdd(data.menuItem, action);
            showToast(data.message);
            setIsModalOpen(false);
          })
          .catch(({ response }) => showToast(response.data.message, "error"))
          .finally(() => setIsSubmitting(false));
      }
    },
  });

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-gray-500 bg-opacity-50 flex justify-center items-center ">
      <div className="relative bg-white rounded-lg shadow-lg max-w-md w-full mx-3">
        <div className="flex items-center justify-between p-4 border-b">
          <h3 className="text-lg font-semibold text-gray-900 inline-flex items-center gap-2">
            {action === "Add" ? "Add" : "Edit"} Item{" "}
            <CookingPot className="text-orange-400 text-2xl" />
          </h3>
          <button
            type="button"
            className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto flex justify-center items-center"
            onClick={() => setIsModalOpen(false)}
          >
            <IoClose className="w-6 h-6" />
          </button>
        </div>
        <form className="p-4 md:p-5" onSubmit={formik.handleSubmit}>
          <div className="grid gap-4 mb-4 grid-cols-4">
            <div className="col-span-2">
              <label
                htmlFor="Dish name"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Dish name
              </label>
              <input
                type="text"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg outline-none block w-full p-2.5 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white "
                {...formik.getFieldProps("name")}
              />
              {formik.errors.name && formik.touched.name && (
                <div className="text-red-500">{formik.errors.name}</div>
              )}
            </div>
            <div className="col-span-2">
              <label
                htmlFor="Dish name"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Price
              </label>
              <input
                type="number"
                className="bg-gray-50 border app border-gray-300 text-gray-900 text-sm rounded-lg outline-none block w-full p-2.5 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white "
                {...formik.getFieldProps("price")}
              />
              {formik.errors.price && formik.touched.price && (
                <div className="text-red-500">{formik.errors.price}</div>
              )}
            </div>
            <div className="col-span-2">
              <label
                htmlFor="countries"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Select an option
              </label>
              <select
                id="countries"
                {...formik.getFieldProps("category")}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg appearance-none outline-none focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              >
                <option value="starters">Starters</option>
                <option value="main course">Main course</option>
                <option value="drinks">Drink</option>
                <option value="dessert">Dessert</option>
              </select>
            </div>

            {action === "Add" ||
            (action === "Edit" &&
              (menuItem?.category === "starters" ||
                menuItem?.category === "main course")) ? (
              <div className="col-span-2 mt-8">
                <label className="inline-flex items-center gap-2">
                  <input
                    type="checkbox"
                    className="form-checkbox h-5 w-5 text-blue-600"
                    checked={formik?.values.isVegetarian}
                    {...formik.getFieldProps("isVegetarian")}
                  />
                  <span>isveg</span>
                </label>
              </div>
            ) : null}
            <div className="col-span-4 ">
              <label htmlFor="tags" className="mb-4">
                Tags
              </label>
              <TagField
                tags={tags}
                addTag={handleAddTag}
                removeTag={handleRemoveTag}
                maxTags={5}
              />
            </div>
          </div>

          <button
            className="text-white w-full  bg-green-500 hover:bg-green-600
             focus:ring-green-400 focus:ring-2 focus:outline-none  font-medium rounded-lg
             text-sm px-5 py-2.5 text-center"
            type="submit"
            disabled={isSubmitting}
          >
            {isSubmitting
              ? action === "Add"
                ? "Adding..."
                : "Updating"
              : action === "Add"
              ? "Add"
              : "Update"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddMenuModal;
