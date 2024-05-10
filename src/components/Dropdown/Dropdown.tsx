import { forwardRef } from "react";
import { capitalize } from "../../design-system/utils";

export interface DropdownProps
  extends React.SelectHTMLAttributes<HTMLSelectElement> {
  options: string[];
  sort: (_key: string) => void;
}

export const Dropdown = forwardRef<HTMLSelectElement, DropdownProps>(
  ({ options, sort, ...props }, ref): JSX.Element => {
    return (
      <select
        onChange={(event) => sort(event.target.value)}
        ref={ref}
        {...props}
      >
        {options.map((entry, index) => (
          <option value={entry} key={index}>
            Order by {capitalize(entry)}
          </option>
        ))}
      </select>
    );
  }
);
Dropdown.displayName = "Dropdown";
