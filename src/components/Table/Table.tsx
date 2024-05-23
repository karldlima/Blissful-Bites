import { capitalize } from "../../design-system/utils";

interface TableProps<T> {
  data: T[];
}

export const Table = <T extends {}>({ data }: TableProps<T>): JSX.Element => {
  return data.length ? (
    <table aria-describedby="table-heading">
      <thead>
        <tr>
          {Object.keys(data[0]).map((header, i) => (
            <th key={i} scope="col">
              {capitalize(header)}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((row, i) => (
          <tr key={i}>
            {Object.values(row).map((entry, colIndex) => (
              <td key={colIndex}>{entry as string}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  ) : (
    <div>
      <h3>No Data, please refine search</h3>
    </div>
  );
};
Table.displayName = "Table";
