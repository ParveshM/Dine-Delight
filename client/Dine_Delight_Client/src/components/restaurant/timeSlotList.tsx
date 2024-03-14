import { Trash } from "lucide-react";

interface TimeSlotItemProps {
  _id: string;
  startTime: string;
  endTime: string;
  handleDeleteSlot: (_id: string) => void;
}
const SlotItem: React.FC<TimeSlotItemProps> = ({
  _id,
  startTime,
  endTime,
  handleDeleteSlot,
}) => {
  return (
    <div className="p-2 border border-gray-200 rounded-md flex justify-between mb-2">
      <p className="font-semibold">
        {startTime} - {endTime}
      </p>
      <div className="space-x-2">
        <button
          className="px-2 py-1 bg-red-500 text-white rounded-md"
          onClick={() => handleDeleteSlot(_id)}
        >
          <Trash />
        </button>
      </div>
    </div>
  );
};
export default SlotItem;
