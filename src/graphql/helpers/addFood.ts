import { client, Food } from "..";
import { ADD_FOOD } from "./queries";

type AddFoodQuery = {
  data: {
    addFood: string;
  };
  loading: boolean;
  networkStatus: number;
};

export const addFood = async (food: Food): Promise<string> => {
  try {
    const foodData = (await client.mutate({
      mutation: ADD_FOOD,
      variables: { ...food, id: Number(food.id) },
    })) as AddFoodQuery;
    return foodData.data.addFood;
  } catch (err) {
    console.log("error fetching food...", err);
    // TODO: return err obj
    return "";
  }
};
