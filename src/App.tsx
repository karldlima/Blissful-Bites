import { useEffect, useState } from "react";

import { Food, foodData } from "./data";
import { Table, Dropdown } from "./components";
import "./App.css";

type SortingCriteria = Omit<keyof Food, "name">;
type SortingOrder = "asc" | "desc";

const App = (): JSX.Element => {
  const [food, setFood] = useState<Food[]>([]);
  const [sortKey, setSortKey] = useState<SortingCriteria>("id");
  const [sortOrder, setSortOrder] = useState<SortingOrder>("asc");

  useEffect(() => {
    setFood(foodData);
  }, []);

  const sort = (key: string) => {
    const returnValue = sortOrder === "desc" ? 1 : -1;
    setSortKey(key);
    setFood([
      ...food.sort((a, b) => {
        return a[key as keyof Food] > b[key as keyof Food]
          ? returnValue * -1
          : returnValue;
      }),
    ]);
  };

  return (
    <>
      {!!food.length && <Dropdown options={Object.keys(food[0])} sort={sort} />}
      <Table data={food} />
    </>
  );
};

export default App;
