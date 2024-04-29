import { useFormik } from "formik";
import * as Yup from "yup";
import { phoneRegex } from "../../../constants";

interface TableConfirmationProps {
  setTable: ({
    tableNumber,
    mobile,
  }: {
    tableNumber: string;
    mobile: string;
  }) => void;
  setTableInputModal: (setOpen: boolean) => void;
}

const validationSchema = Yup.object().shape({
  tableNumber: Yup.string().required("Table number is required"),
  mobile: Yup.string()
    .required("Mobile number is required")
    .matches(phoneRegex, "Mobile number must be 10 digits"),
});

const TableConfirmation: React.FC<TableConfirmationProps> = ({
  setTable,
  setTableInputModal,
}) => {
  const formik = useFormik({
    initialValues: {
      tableNumber: "",
      mobile: "",
    },
    validationSchema,
    onSubmit: ({ tableNumber, mobile }) => {
      tableNumber.toUpperCase();
      setTable({ tableNumber, mobile });
      setTableInputModal(false);
    },
  });

  return (
    <div className="fixed inset-0 z-50  overflow-y-auto bg-gray-500 bg-opacity-50 flex justify-center items-center">
      <div className="relative p-4 w-full max-w-md max-h-full">
        <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
          <div className="p-4 md:p-5 text-center">
            <form className="col-span-2" onSubmit={formik.handleSubmit}>
              <div className="flex flex-col items-start mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="table number"
                >
                  Table number
                </label>
                <input
                  className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  type="text"
                  placeholder="Enter your table number"
                  {...formik.getFieldProps("tableNumber")}
                />
                {formik.errors.tableNumber && formik.touched.tableNumber && (
                  <p className="text-red-500">{formik.errors.tableNumber}</p>
                )}
              </div>
              <div className="flex flex-col items-start mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="Mobile"
                >
                  Mobile
                </label>
                <input
                  className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  type="text"
                  placeholder="Enter your mobile number"
                  {...formik.getFieldProps("mobile")}
                />
                {formik.errors.mobile && formik.touched.mobile && (
                  <p className="text-red-500">{formik.errors.mobile}</p>
                )}
              </div>
              <button
                type="submit"
                className="text-white   w-full bg-black hover:bg-black  focus:outline-none  dark:focus:ring-red-800 font-medium rounded-lg text-sm  px-5 py-2.5 text-center"
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TableConfirmation;
