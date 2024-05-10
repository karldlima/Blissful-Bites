import { capitalize } from "../../design-system/utils";

interface DropdownProps {
  options: string[];
  sort: (key: string) => void;
}

export const Dropdown = ({ options, sort }: DropdownProps) => {
  return (
    <select onChange={(event) => sort(event.target.value)}>
      {options.map((entry, index) => (
        <option value={entry} key={index}>
          Order by {capitalize(entry)}
        </option>
      ))}
    </select>
  );
};
Dropdown.displayName = "Dropdown";
