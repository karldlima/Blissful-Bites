import { useEffect, useState } from "react";

import { Food, foodData } from "./data";
import { FoodTable } from "./components";
import "./App.css";

const App = (): JSX.Element => {
  const [food, setFood] = useState<Food[]>([]);

  useEffect(() => {
    setFood(foodData);
  }, []);
  return (
    <>
      <FoodTable data={food} />
    </>
  );
};

export default App;
