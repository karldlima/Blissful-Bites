import { client, Food } from "..";
import { LIST_FOOD } from "./queries";

type FetchFoodQuery = {
  data: {
    food: Food[];
  };
  loading: boolean;
  networkStatus: number;
};

export const fetchFood = async (): Promise<Food[]> => {
  try {
    const foodData = (await client.query({
      query: LIST_FOOD,
    })) as FetchFoodQuery;
    return foodData.data.food;
  } catch (err) {
    console.log("error fetching food...", err);
    // TODO: return err obj
    return [];
  }
};
