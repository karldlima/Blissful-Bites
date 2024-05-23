import { useMemo, useState } from "react";

import { Table, Dropdown, Button, Input } from "./components";
import FoodForm from "./components/Forms/FoodForm";
import { Food, foodData } from "./data";

import "./App.css";

type SortingCriteria = Exclude<keyof Food, "name">;
type SortingOrder = "asc" | "desc";

const App = (): JSX.Element => {
  const [sortKey, setSortKey] = useState<SortingCriteria>("id");
  const [sortOrder, setSortOrder] = useState<SortingOrder>("asc");
  const [searchValue, setSearchValue] = useState<string>("");
  const [addedFood, setAddedFood] = useState<Food[]>([]);

  const food: Food[] = useMemo(() => {
    const returnValue = sortOrder === "desc" ? 1 : -1;
    const allFood = [...foodData, ...addedFood];
    return [
      ...allFood.sort((a, b) => {
        return a[sortKey] > b[sortKey] ? returnValue * -1 : returnValue;
      }),
    ];
  }, [sortKey, sortOrder, addedFood]);

  const filteredFood: Food[] = useMemo(() => {
    return food.filter((foodItem) =>
      Object.values(foodItem).join("").includes(searchValue)
    );
  }, [searchValue, food]);

  // TODO: add debounce to reduce unnecessary renders
  const search = (search: React.ChangeEvent<HTMLInputElement>): void => {
    setSearchValue(search.target.value);
  };

  const sort = (key: string): void => {
    setSortKey(key as SortingCriteria);
  };

  const flipOrder = (): void => {
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };

  const submit = (food: Food): void => {
    setAddedFood([...addedFood, food]);
  };

  return (
    <>
      <header>
        <h1>Blissful Bites</h1>
      </header>
      <main>
        <section>
          <div className="control-container">
            <Input
              type="search"
              placeholder="Filter by any field"
              aria-label="Filter by any field"
              onChange={search}
            />
            <div className="sort-container">
              {!!food.length && (
                <Dropdown options={["id", "type", "topping"]} sort={sort} />
              )}
              <Button onClick={flipOrder}>
                <span className="sr-only">order by </span>
                {sortOrder.toUpperCase()}
              </Button>
            </div>
          </div>
          <>
            <header className="table-container">
              <h3 id="table-heading">Bites</h3>
            </header>
            <div className="data-container">
              <Table data={filteredFood} />
            </div>
          </>
        </section>
        <section>
          <div className="form-container">
            <header>
              <h3 id="form-heading">Add your own bite</h3>
            </header>
            <FoodForm onSubmit={submit} />
          </div>
        </section>
      </main>
    </>
  );
};

export default App;
