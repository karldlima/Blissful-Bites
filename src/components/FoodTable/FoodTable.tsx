import * as React from "react";

import { Food } from "../../data";
import "./FoodTable.css";

interface FoodTableProps {
  data: Food[];
}

export const FoodTable = ({ data }: FoodTableProps): JSX.Element => (
  <>
    <div className="container">
      <div className="header">ID</div>
      <div className="header">Type</div>
      <div className="header">Name</div>
      <div className="header">Topping</div>

      {data.map(({ id, type, name, topping }, i) => (
        <React.Fragment key={i}>
          <div className="cell">{id}</div>
          <div className="cell">{type}</div>
          <div className="cell">{name}</div>
          <div className="cell">{topping}</div>
        </React.Fragment>
      ))}
    </div>
  </>
);
FoodTable.displayName = "FoodTable";
