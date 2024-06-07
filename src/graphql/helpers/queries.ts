import { gql } from "@apollo/client";

export const LIST_FOOD = gql`
  query listFood {
    food {
      id
      type
      name
      topping
    }
  }
`;
