import { memo } from "react";
import { ApprovalModalType } from "../../types/PropsType";

const ApprovalModal: React.FC<ApprovalModalType> = ({
  isModalOpen,
  sendAction,
  name,
  email,
}) => {
  return (
    <div
      tabIndex={-1}
      aria-hidden="true"
      className={`fixed inset-0 z-50 overflow-y-auto bg-gray-500 bg-opacity-50 flex justify-center items-center`}
    >
      <div className="relative bg-white rounded-lg shadow-lg max-w-md w-full">
        <div className="flex items-center justify-between p-4 border-b">
          <h3 className="text-lg font-semibold text-gray-900">
            Restaurant Details
          </h3>
          <button
            type="button"
            className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto flex justify-center items-center"
            onClick={() => isModalOpen(false)}
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
        <div className="p-4 md:p-5">
          <div className="grid gap-4 mb-4 grid-cols-2">
            <div className="col-span-2">
              <label
                htmlFor="name"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Restaurant name
              </label>
              <input
                type="text"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg outline-none block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white "
                value={name}
                readOnly
              />
            </div>
            <div className="col-span-2 ">
              <label
                htmlFor="Email"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Email
              </label>
              <input
                type="text"
                className="bg-gray-50 border border-gray-300 outline-none text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                value={email}
                readOnly
              />
            </div>
          </div>
          <div className="flex justify-end gap-2">
            <button
              className="text-white  bg-red-600  focus:ring-2 focus:ring-red-300 focus:outline-none  font-medium rounded-lg text-sm px-5 py-2.5 text-center "
              onClick={() => sendAction("rejected")}
            >
              Reject
            </button>
            <button
              className="text-white  bg-green-500 hover:bg-green-600 focus:ring-green-400 focus:ring-2 focus:outline-none  font-medium rounded-lg text-sm px-5 py-2.5 text-center "
              onClick={() => sendAction("approved")}
            >
              Approve
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default memo(ApprovalModal);
