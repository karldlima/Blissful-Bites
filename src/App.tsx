import { useEffect, useState } from "react";

import { Food, foodData } from "./data";
import "./App.css";

const App = (): JSX.Element => {
  const [food, setFood] = useState<Food[]>([]);

  useEffect(() => {
    setFood(foodData);
  }, []);
  return <>SweetShop</>;
};

export default App;
