import { forwardRef } from "react";
import { capitalize } from "../../utils";

interface DropdownProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  options: string[];
  sort: (_key: string) => void;
}

export const Dropdown = forwardRef<HTMLSelectElement, DropdownProps>(
  ({ options, sort, ...props }, ref): JSX.Element => {
    return (
      <div className="dropdown-container">
        <select
          aria-label="Sort types"
          onChange={(event) => sort(event.target.value)}
          ref={ref}
          {...props}
        >
          {options.map((entry, index) => (
            <option value={entry} key={index}>
              Sort by {capitalize(entry)}
            </option>
          ))}
        </select>
      </div>
    );
  }
);
Dropdown.displayName = "Dropdown";
