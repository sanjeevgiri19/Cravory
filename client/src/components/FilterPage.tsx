import { Button } from "./ui/button";
import { Checkbox } from "./ui/checkbox";
import { Label } from "./ui/label";

export type FilterOptions = {
  id: string;
  label: string;
};

const filterOptions: FilterOptions[] = [
  { id: "burger", label: "Burger" },
  { id: "thali", label: "Thali" },
  { id: "biryani", label: "Biryani" },
  { id: "momo", label: "Momo" },
];

const FilterPage = () => {
  const appliedFilterHandler = (value: string) => {
    // alert("item selected");
  };

  return (
    <div className="md:w-72">
      <div className="flex justify-between items-center">
        <h2 className="font-medium text-lg">Filter By Cuisines</h2>
        <Button variant={"link"} className="">
          Reset
        </Button>
      </div>
      {filterOptions.map((option) => (
        <div
          key={option.id}
          className="flex items-center space-x-2 my-3 cursor-pointer"
        >
          <Checkbox
            id={option.id}
            onClick={() => appliedFilterHandler(option.label)}
          />
          <Label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
            {option.label}
          </Label>
        </div>
      ))}
    </div>
  );
};

export default FilterPage;
