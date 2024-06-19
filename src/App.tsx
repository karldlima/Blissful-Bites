import { useEffect, useMemo, useState } from "react";

import { Table, Dropdown, Button, Input } from "./components";
import FoodForm from "./components/Forms/FoodForm";
import { addFood, client, fetchFood, Food, LIST_FOOD } from "./graphql";

import "./App.css";

type SortingCriteria = Exclude<keyof Food, "name">;
type SortingOrder = "asc" | "desc";

const App = (): JSX.Element => {
  const [foodData, setFoodData] = useState<Food[]>([]);
  const [sortKey, setSortKey] = useState<SortingCriteria>("id");
  const [sortOrder, setSortOrder] = useState<SortingOrder>("asc");
  const [searchValue, setSearchValue] = useState<string>("");

  useEffect(() => {
    getFood();
  }, []);

  async function getFood() {
    try {
      const foodData: Food[] = await fetchFood();
      setFoodData(foodData);
    } catch (err) {
      // Error handling
    }
  }

  const food: Food[] = useMemo(() => {
    const returnValue = sortOrder === "desc" ? 1 : -1;

    return [
      ...[...foodData].sort((a, b) => {
        return a[sortKey] > b[sortKey] ? -returnValue : returnValue;
      }),
    ];
  }, [foodData, sortKey, sortOrder]);

  const filteredFood: Food[] = useMemo(
    () =>
      food.filter((foodItem) =>
        Object.values(foodItem).join("").includes(searchValue)
      ),
    [searchValue, food]
  );

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

  const submit = async (food: Food): Promise<void> => {
    await addFood(food);
    const foodData = await client.refetchQueries({
      include: [
        {
          query: LIST_FOOD,
        },
      ],
    });
    setFoodData(foodData[0].data.food);
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
