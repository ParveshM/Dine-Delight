import { useFormik } from "formik";
import { IoClose } from "react-icons/io5";
import { useCallback, useMemo, useState } from "react";
import axiosJWT from "../../utils/axiosService";
import { ADMIN_API, RESTAURANT_API } from "../../constants";
import showToast from "../../utils/toaster";
import { ReportDataInterface } from "../../types/PropsType";
import { arrayToExcel, pdfGenerator } from "../../utils/exportData";
import { getLastDayOfMonth, getfirstDayOfMonth } from "../../utils/util";
import { useAppSelector } from "../../redux/store/Store";
import { ChevronDown } from "lucide-react";
import * as Yup from "yup";

const validationSchema = Yup.object().shape({
  startDate: Yup.date().required("Start date is required"),

  endDate: Yup.date()
    .required("End date is required")
    .min(Yup.ref("startDate"), "End date must be after start date")
    .test(
      "greater-than-start",
      "From date must be greater than To date",
      function (value, { parent }) {
        const { startDate } = parent;
        return value > new Date(startDate);
      }
    ),
});

const ReportModal: React.FC<{ isModalOpen: (isOpen: boolean) => void }> = ({
  isModalOpen,
}) => {
  const [hasData, setHasData] = useState<boolean>(true);
  const [data, setData] = useState<ReportDataInterface[]>([]);
  const { role } = useAppSelector((state) => state.UserSlice);
  const isSeller = useMemo(() => role === "seller", [role]);

  const formik = useFormik({
    initialValues: {
      startDate: getfirstDayOfMonth(),
      endDate: getLastDayOfMonth(),
      ...(isSeller && { selectedStatus: "" }),
    },
    validationSchema,
    onSubmit: ({ startDate, endDate, selectedStatus }) => {
      const API_URI = role === "seller" ? RESTAURANT_API : ADMIN_API;
      axiosJWT
        .get(API_URI + "/reports", {
          params: {
            startDate,
            endDate,
            status: selectedStatus,
          },
        })
        .then(({ data }) => {
          setData(data.report);
          setHasData(data.report.length);
        })
        .catch(() => showToast("Oops! Something went wrong", "error"));
    },
  });
  const exportFile = useCallback(() => {
    try {
      const fileName = `${formik.values.startDate}-${formik.values.endDate} Report.xls`;
      arrayToExcel.convertArrayToTable(data, fileName, role);
    } catch (error) {
      console.error("Error in generating excel", error);
    }
  }, [data]);

  return (
    <div
      className={`fixed inset-0 z-50 overflow-y-auto bg-gray-500 bg-opacity-50 flex justify-center items-center `}
    >
      <div className="relative bg-white rounded-lg shadow-lg max-w-md w-full mx-2">
        <div className="flex items-center justify-between p-4 border-b">
          <h3 className="text-lg font-semibold text-gray-900">
            Generate Report
          </h3>
          <button
            type="button"
            className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto flex justify-center items-center"
            onClick={() => isModalOpen(false)}
          >
            <IoClose className="w-6 h-6" />
          </button>
        </div>
        <div className="p-4 md:p-5">
          <form
            className="grid gap-4 mb-4 grid-cols-2"
            onSubmit={formik.handleSubmit}
          >
            <div className="col-span-1">
              <label
                htmlFor="startDate"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                From
              </label>
              <input
                type="date"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg outline-none block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white "
                {...formik.getFieldProps("startDate")}
              />
            </div>
            <div className="col-span-1 ">
              <label
                htmlFor="endeDate"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                To
              </label>
              <input
                type="date"
                className="bg-gray-50 border border-gray-300 outline-none text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                {...formik.getFieldProps("endDate")}
              />
            </div>
            {formik.errors.endDate && (
              <p className="col-span-2 flex justify-center items-center text-red-500">
                {formik.errors.endDate}
              </p>
            )}
            {isSeller && (
              <div className="relative col-span-2">
                <select
                  className="block w-full appearance-none bg-white border border-gray-300 text-sm py-1 px-2 pr-8 rounded-md focus:outline-none focus:border-blue-500"
                  {...formik.getFieldProps("selectedStatus")}
                >
                  <option value="">All</option>
                  <option value="Pending">Pending</option>
                  <option value="Confirmed">Confirmed</option>
                  <option value="Cancelled">Cancelled</option>
                  <option value="Checked-in">Checked-in</option>
                  <option value="No-show">No-show</option>
                  <option value="Completed">Completed</option>
                </select>
                <div className="absolute top-1 right-0 flex items-center px-2 pointer-events-none">
                  <ChevronDown />
                </div>
              </div>
            )}
            <div className="col-span-2">
              <button
                type="submit"
                className="text-white w-full bg-green-500 hover:bg-green-600 focus:ring-green-400 focus:ring-2 focus:outline-none  font-medium rounded-lg text-sm px-5 py-2.5 text-center"
              >
                Generate Report
              </button>
            </div>
          </form>
          {hasData && data.length ? (
            <div className="flex justify-between gap-2">
              <button
                className="text-white w-full bg-blue-500 hover:bg-blue-600 
              focus:ring-2 focus:ring-blue-300 focus:outline-none font-medium 
              rounded-lg text-sm px-5 py-2.5 text-center"
                onClick={() =>
                  pdfGenerator(
                    data,
                    formik.values.startDate,
                    formik.values.endDate,
                    "Revenue Report",
                    role
                  )
                }
              >
                Download PDF
              </button>

              <button
                className="text-white w-full bg-gray-500 hover:bg-gray-600 focus:ring-green-400 focus:ring-2 focus:outline-none  font-medium rounded-lg text-sm px-5 py-2.5 text-center "
                onClick={exportFile}
              >
                Download Excel
              </button>
            </div>
          ) : !hasData ? (
            <p className="text-center text-gray-500 mt-4">
              No matching data on your filter
            </p>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default ReportModal;
