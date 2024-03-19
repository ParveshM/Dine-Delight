import { useFormik } from "formik";
import { memo, useState } from "react";
import { ImSpinner } from "react-icons/im";
import { MdOutlineTableBar } from "react-icons/md";
import * as Yup from "yup";
import axiosJWT from "../../../utils/axiosService";
import { RESTAURANT_API } from "../../../constants";
import { TableDataInterface } from "../../../pages/restaurant/Tables/Tables";
import showToast from "../../../utils/toaster";

export interface AddTableModalProps {
  setIsModalOpen: (isOpen: boolean) => void;
  addNewTable: (newTableData: TableDataInterface) => void;
}
const validationSchema = Yup.object().shape({
  tableNumber: Yup.string()
    .required("Table number is required")
    .matches(
      /^[A-Za-z]+\d+$/,
      "Table number must start with a letter followed by numbers"
    )
    .max(10, "Table number must me less than 10 characters"),
});

const AddTableModal: React.FC<AddTableModalProps> = ({
  setIsModalOpen,
  addNewTable,
}) => {
  const [isSubmitting, setIsSubmitting] = useState<boolean>();

  const formik = useFormik({
    initialValues: {
      tableNumber: "",
      capacity: 2,
      location: "In",
    },
    validationSchema,
    onSubmit: (data) => {
      setIsSubmitting(true);
      axiosJWT
        .post(RESTAURANT_API + "/table/new", data)
        .then(({ data }) => {
          addNewTable(data.newTable);
          setIsModalOpen(false);
          showToast(data.message);
        })
        .catch(({ response }) => {
          setIsSubmitting(false);
          showToast(response.data.message, "error");
        });
    },
  });

  return (
    <div
      tabIndex={-1}
      aria-hidden="true"
      className="fixed inset-0 z-50 overflow-y-auto bg-gray-500 bg-opacity-50 flex justify-center items-center "
    >
      <div className="relative bg-white rounded-lg shadow-lg max-w-md w-full mx-3">
        <div className="flex items-center justify-between p-4 border-b">
          <h3 className="text-lg font-semibold text-gray-900 inline-flex items-center gap-2">
            Add table <MdOutlineTableBar className="text-orange-400 text-2xl" />
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
        <form className="p-4 md:p-5" onSubmit={formik.handleSubmit}>
          <div className="grid gap-4 mb-4 grid-cols-4">
            <div className="col-span-2">
              <label
                htmlFor="Table number"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Table number
              </label>
              <input
                type="text"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg outline-none block w-full p-2.5 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white "
                {...formik.getFieldProps("tableNumber")}
              />
              {formik.errors.tableNumber && formik.touched.tableNumber && (
                <div className="text-red-500">{formik.errors.tableNumber}</div>
              )}
            </div>
            <div className="col-span-2 ">
              <label
                htmlFor="Table size"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Table size
              </label>
              <select
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 focus:outline-none block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                onChange={formik.handleChange}
              >
                <option defaultValue={2}>2</option>
                <option value={4}>4</option>
                <option value={6}>6</option>
              </select>
            </div>
            <div className="col-span-2 ">
              <label
                htmlFor="Table Location"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Location
              </label>
              <div className="flex ">
                <div className="mb-[0.125rem] mr-4 inline-block min-h-[1.5rem] pl-[1.5rem]">
                  <input
                    className="relative float-left -ml-[1.5rem] mr-1 mt-0.5 h-5 w-5 appearance-none rounded-full border-2 border-solid border-neutral-300 before:pointer-events-none before:absolute before:h-4 before:w-4 before:scale-0 before:rounded-full before:bg-transparent before:opacity-0 before:shadow-[0px_0px_0px_13px_transparent] before:content-[''] after:absolute after:z-[1] after:block after:h-4 after:w-4 after:rounded-full after:content-[''] checked:border-primary checked:before:opacity-[0.16] checked:after:absolute checked:after:left-1/2 checked:after:top-1/2 checked:after:h-[0.625rem] checked:after:w-[0.625rem] checked:after:rounded-full checked:after:border-primary checked:after:bg-primary checked:after:content-[''] checked:after:[transform:translate(-50%,-50%)] hover:cursor-pointer hover:before:opacity-[0.04] hover:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:shadow-none focus:outline-none focus:ring-0 focus:before:scale-100 focus:before:opacity-[0.12] focus:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:before:transition-[box-shadow_0.2s,transform_0.2s] checked:focus:border-primary checked:focus:before:scale-100 checked:focus:before:shadow-[0px_0px_0px_13px_#3b71ca] checked:focus:before:transition-[box-shadow_0.2s,transform_0.2s] dark:border-neutral-600 dark:checked:border-primary dark:checked:after:border-primary dark:checked:after:bg-primary dark:focus:before:shadow-[0px_0px_0px_13px_rgba(255,255,255,0.4)] dark:checked:focus:border-primary dark:checked:focus:before:shadow-[0px_0px_0px_13px_#3b71ca]"
                    type="radio"
                    name="location"
                    id="inlineRadio1"
                    value="In"
                    defaultChecked={formik.values.location === "In"}
                    onChange={formik.handleChange}
                  />
                  <label
                    className="mt-px inline-block pl-[0.15rem] hover:cursor-pointer"
                    htmlFor="inlineRadio1"
                  >
                    In
                  </label>
                </div>
                <div className="mb-[0.125rem] mr-4 inline-block min-h-[1.5rem] pl-[1.5rem]">
                  <input
                    className="relative float-left -ml-[1.5rem] mr-1 mt-0.5 h-5 w-5 appearance-none rounded-full border-2 border-solid border-neutral-300 before:pointer-events-none before:absolute before:h-4 before:w-4 before:scale-0 before:rounded-full before:bg-transparent before:opacity-0 before:shadow-[0px_0px_0px_13px_transparent] before:content-[''] after:absolute after:z-[1] after:block after:h-4 after:w-4 after:rounded-full after:content-[''] checked:border-primary checked:before:opacity-[0.16] checked:after:absolute checked:after:left-1/2 checked:after:top-1/2 checked:after:h-[0.625rem] checked:after:w-[0.625rem] checked:after:rounded-full checked:after:border-primary checked:after:bg-primary checked:after:content-[''] checked:after:[transform:translate(-50%,-50%)] hover:cursor-pointer hover:before:opacity-[0.04] hover:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:shadow-none focus:outline-none focus:ring-0 focus:before:scale-100 focus:before:opacity-[0.12] focus:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:before:transition-[box-shadow_0.2s,transform_0.2s] checked:focus:border-primary checked:focus:before:scale-100 checked:focus:before:shadow-[0px_0px_0px_13px_#3b71ca] checked:focus:before:transition-[box-shadow_0.2s,transform_0.2s] dark:border-neutral-600 dark:checked:border-primary dark:checked:after:border-primary dark:checked:after:bg-primary dark:focus:before:shadow-[0px_0px_0px_13px_rgba(255,255,255,0.4)] dark:checked:focus:border-primary dark:checked:focus:before:shadow-[0px_0px_0px_13px_#3b71ca]"
                    type="radio"
                    name="location"
                    id="inlineRadio2"
                    value="Out"
                    defaultChecked={formik.values.location === "Out"}
                    onChange={formik.handleChange}
                  />
                  <label
                    className="mt-px inline-block pl-[0.15rem] hover:cursor-pointer"
                    htmlFor="inlineRadio2"
                  >
                    Out
                  </label>
                </div>
              </div>
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
export default memo(AddTableModal);
