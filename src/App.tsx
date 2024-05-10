import { useEffect, useState } from "react";

import { Food, foodData } from "./data";
import { Table, Dropdown, Button } from "./components";
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

  const flipOrder = () => {
    const updatedOrder = sortOrder === "asc" ? "desc" : "asc";
    setSortOrder(updatedOrder);
    sort(sortKey as keyof Food);
  };

  return (
    <>
      {!!food.length && (
        <Dropdown options={["id", "type", "topping"]} sort={sort} />
      )}
      <Button onClick={flipOrder}>({sortOrder})</Button>
      <Table data={food} />
    </>
  );
};

export default App;
