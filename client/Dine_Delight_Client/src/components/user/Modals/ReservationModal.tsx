interface ReserveModalProps {
  setIsModalOpen: (isOpen: boolean) => void;
}

const ReservationModal: React.FC<ReserveModalProps> = ({ setIsModalOpen }) => {
  return (
    <div
      tabIndex={-1}
      aria-hidden="true"
      className="fixed inset-0 z-50 overflow-y-auto bg-gray-500 bg-opacity-50 flex justify-center items-center "
    >
      <dialog className="flex justify-center items-center border z-50 p-5  bg-white rounded-md ">
        <div className="flex flex-col w-full h-auto ">
          <div className="flex w-full h-auto justify-center items-center">
            <div className="flex w-10/12 h-auto py-3 justify-center items-center text-2xl font-bold"></div>
            <div className="flex w-1/12 h-auto justify-center cursor-pointer">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#000000"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="feather feather-x"
                onClick={() => setIsModalOpen(false)}
              >
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </div>
          </div>
          <div className="flex w-full h-auto py-10 px-2 justify-center items-center bg-gray-200 rounded text-center text-gray-500">
            This is a text inside the modal. You can add your content here.
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default ReservationModal;
