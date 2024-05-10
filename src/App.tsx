import { useMemo, useState } from "react";

import { Table, Dropdown, Button, Input } from "./components";
import FoodForm from "./components/Forms/FoodForm";
import { Food, foodData } from "./data";
import "./App.css";

type SortingCriteria = Omit<keyof Food, "name">;
type SortingOrder = "asc" | "desc";

const App = (): JSX.Element => {
  const [sortKey, setSortKey] = useState<SortingCriteria>("id");
  const [sortOrder, setSortOrder] = useState<SortingOrder>("asc");
  const [searchValue, setSearchValue] = useState<string>("");
  const [addedFood, setAddedFood] = useState<Food[]>([]);

  const food = useMemo(() => {
    const returnValue = sortOrder === "desc" ? 1 : -1;
    const allFood = [...foodData, ...addedFood];
    return [
      ...allFood.sort((a, b) => {
        return a[sortKey as keyof Food] > b[sortKey as keyof Food]
          ? returnValue * -1
          : returnValue;
      }),
    ];
  }, [sortKey, sortOrder, addedFood]);

  const filteredFood = useMemo(() => {
    return food.filter((foodItem) =>
      Object.values(foodItem).join("").toLowerCase().includes(searchValue)
    );
  }, [searchValue, food]);

  // TODO: add debounce to reduce unnecessary renders
  const search = (search: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(search.target.value);
  };

  const sort = (key: string) => {
    setSortKey(key);
  };

  const flipOrder = () => {
    const updatedOrder = sortOrder === "asc" ? "desc" : "asc";
    setSortOrder(updatedOrder);
    sort(sortKey as keyof Food);
  };

  const submit = (food: Food) => {
    setAddedFood([...addedFood, food]);
  };

  return (
    <>
      <Input type="text" placeholder="Search for bites" onChange={search} />
      {!!food.length && (
        <Dropdown options={["id", "type", "topping"]} sort={sort} />
      )}
      <Button onClick={flipOrder}>({sortOrder})</Button>
      <Table data={filteredFood} />
      <FoodForm onSubmit={submit} />
    </>
  );
};

export default App;
