import { Dropdown } from "flowbite-react";
import { FilterIcon } from "lucide-react";
import { FilterType } from "../../hooks/useRestaurantList";

const FilterDropdown: React.FC<{ setFilter: (filter: FilterType) => void }> = ({
  setFilter,
}) => {
  return (
    <Dropdown
      label=""
      dismissOnClick={true}
      renderTrigger={() => <FilterIcon className="mr-2  text-slate-500" />}
      placement="right"
      className="ml-4 absolute righ-0 bottm-10"
    >
      <Dropdown.Header>Filter by cost</Dropdown.Header>
      <Dropdown.Item onClick={() => setFilter({ costPerPerson: "299" })}>
        Less than 300
      </Dropdown.Item>
      <Dropdown.Item onClick={() => setFilter({ costPerPerson: "300" })}>
        300 to 600
      </Dropdown.Item>
      <Dropdown.Item onClick={() => setFilter({ costPerPerson: "600" })}>
        Above 600
      </Dropdown.Item>
      <Dropdown.Header>Sortby</Dropdown.Header>
      <Dropdown.Item onClick={() => setFilter({ sortType: "restaurantName" })}>
        Name
      </Dropdown.Item>
      <Dropdown.Item onClick={() => setFilter({ sortType: "rating" })}>
        Rating
      </Dropdown.Item>
    </Dropdown>
  );
};
export default FilterDropdown;
