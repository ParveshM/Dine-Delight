import { X } from "lucide-react";
import { FilterType } from "../../../hooks/useRestaurantList";
type AppliedFilterType = {
  filters: FilterType;
  removeFilter: (filter: FilterType) => void;
};

const AppliedFilters: React.FC<AppliedFilterType> = ({
  filters,
  removeFilter,
}) => {
  const { costPerPerson: cost, sortType } = filters;
  const getCostRange = (cost: string) => {
    if (cost === "299") return "0 - 300";
    if (cost === "300") return "300 - 600";
    return "600+";
  };
  return (
    <div className="flex flex-wrap justify-center gap-2 mb-2 ">
      {cost && (
        <div className="flex items-center bg-yellow-200 text-yellow-900 rounded-full px-3 py-1 shadow-md">
          <span className="mr-1 font-semibold text-sm">
            Cost: {getCostRange(cost)}
          </span>
          <X
            className="h-4 cursor-pointer"
            onClick={() => removeFilter({ costPerPerson: null })}
          />
        </div>
      )}
      {sortType && (
        <div className="flex items-center bg-yellow-200 text-yellow-900 rounded-full px-3 py-1 shadow-md">
          <span className="mr-1 font-semibold text-sm">
            SortBy: {sortType?.toUpperCase()}
          </span>
          <X
            className="h-4 cursor-pointer"
            onClick={() => removeFilter({ sortType: null })}
          />
        </div>
      )}
    </div>
  );
};
export default AppliedFilters;
