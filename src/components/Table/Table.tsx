import { capitalize } from "../../design-system/utils";
import "./Table.css";

interface TableProps<T> {
  data: T[];
}

export const Table = <T extends Record<string, any>>({
  data,
}: TableProps<T>): JSX.Element => {
  return !!data.length ? (
    <table>
      <thead>
        <tr>
          {Object.keys(data[0]).map((header, i) => (
            <th key={i}>{capitalize(header)}</th>
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
      <h2>No Data, please refine search</h2>
    </div>
  );
};
Table.displayName = "Table";
