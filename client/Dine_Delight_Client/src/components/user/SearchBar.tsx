import { Dropdown } from "flowbite-react";
import { FilterIcon, Search } from "lucide-react";
import { ChangeEvent, useState } from "react";
import { DebounceInput } from "react-debounce-input";

const SearchBar: React.FC<{ handleSearch: (query: string) => void }> = ({
  handleSearch,
}) => {
  const [searchText, setSearchText] = useState<string>("");
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value.trim();
    setSearchText(val);
    handleSearch(val);
  };
  return (
    <div className=" max-w-7xl sm:px-6 lg:px-8 ">
      <div className="relative isolate overflow-hidden bg-white px-6 py-20 text-center sm:px-16 sm:shadow-sm">
        <p className="mx-auto max-w-2xl text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
          Find your favorite restaurant !
        </p>

        <div>
          <label
            className="mx-auto mt-8 relative bg-white min-w-sm max-w-2xl flex  items-center justify-center border py-2 px-2 rounded-3xl gap-2 shadow-2xl focus-within:border-gray-300"
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
          </label>
        </div>
      </div>
    </div>
  );
};
export default SearchBar;

const FilterDropdown = () => {
  return (
    <Dropdown
      label=""
      dismissOnClick={false}
      renderTrigger={() => <FilterIcon className="mr-2 text-slate-500" />}
      placement="right-start"
    >
      <Dropdown.Item>A-Z</Dropdown.Item>
      <Dropdown.Item>Veg</Dropdown.Item>
      <Dropdown.Item>Non-Veg</Dropdown.Item>
    </Dropdown>
  );
};
