import { Dropdown } from "flowbite-react";
import { FilterIcon, Search } from "lucide-react";
import { ChangeEvent, useState } from "react";
import { DebounceInput } from "react-debounce-input";
import { FilterType } from "../../hooks/useRestaurantList";
import AppliedFilters from "./AppliedFilter";
import FilterDropdown from "./FilterDropdown";

interface SearchProps {
  handleSearch: (query: string) => void;
  appliedFilters: FilterType;
  setFilter: (filter: FilterType) => void;
}
const SearchBar: React.FC<SearchProps> = ({
  handleSearch,
  setFilter,
  appliedFilters,
}) => {
  const [searchText, setSearchText] = useState<string>("");
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value.trim();
    setSearchText(val);
    handleSearch(val);
  };
  return (
    <div className=" max-w-7xl sm:px-6 lg:px-8 ">
      <div className="relative isolate overflow-hidden px-6 py-[73px] text-center sm:px-16  ">
        <p className="mx-auto max-w-2xl text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
          Find your favorite restaurant !
        </p>

        <div>
          <label
            className="mx-auto mt-8 relative min-w-sm max-w-2xl flex  items-center justify-center border py-2 px-2 rounded-3xl gap-2 shadow-2xl focus-within:border-gray-300"
            htmlFor="search-bar"
          >
            <Search className="ml-2 text-slate-500" />
            <DebounceInput
              minLength={1}
              debounceTimeout={500}
              value={searchText}
              onChange={handleInputChange}
              placeholder="your keyword here"
              name="search"
              className="px-6 py-2 w-full rounded-xl flex-1 outline-none bg-white"
            />
            <FilterDropdown setFilter={setFilter} />
          </label>
        </div>
      </div>
      <AppliedFilters filters={appliedFilters} removeFilter={setFilter} />
    </div>
  );
};
export default SearchBar;
