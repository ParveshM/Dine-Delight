import { CookingPot } from "lucide-react";
import { getStatusColor } from "../../../utils/util";

const ProgerssBar: React.FC<{ cookingStatus: string }> = ({
  cookingStatus,
}) => {
  const { color, width } = getStatusColor(cookingStatus);
  return (
    <div className="max-w-2xl ">
      <div className="flex justify-between mb-1">
        <span className="text-base font-medium text-blue-700 dark:text-white">
          Cooking status
        </span>
        <span
          className={`inline-flex items-center gap-2 text-sm font-medium text-blue-700 dark:text-white`}
        >
          {cookingStatus} <CookingPot />
        </span>
      </div>
      <div className="max-w-2xl bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
        <div
          className={`bg-${color}-600 h-2.5 rounded-full`}
          style={{ width, backgroundColor: color }}
        ></div>
      </div>
    </div>
  );
};

export default ProgerssBar;
