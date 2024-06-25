import { api, Food } from "..";
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
    const foodData = (await api.query({
      query: LIST_FOOD,
    })) as FetchFoodQuery;
    return foodData.data.food;
  } catch (err) {
    return Promise.reject(new Error(`error fetching food: ${err}`));
  }
};
