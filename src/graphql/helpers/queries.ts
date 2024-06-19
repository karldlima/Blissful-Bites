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

export const ADD_FOOD = gql`
  mutation ($id: Int!, $type: String!, $name: String!, $topping: String!) {
    addFood(id: $id, type: $type, name: $name, topping: $topping)
  }
`;
