import { capitalizeFirstLetter } from "../../design-system/utils";
import { Food } from "../../data";
import "./Table.css";

interface TableProps {
  data: Food[];
}

export const Table = ({ data }: TableProps): JSX.Element => {
  return !!data.length ? (
    <table>
      <thead>
        <tr>
          {Object.keys(data[0]).map((header, i) => (
            <th key={i}>{capitalizeFirstLetter(header)}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((row, i) => (
          <tr key={i}>
            {Object.values(row).map((entry, colIndex) => (
              <td key={colIndex}>{entry}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  ) : (
    <div>
      <h2>No Data</h2>
    </div>
  );
};
Table.displayName = "Table";
