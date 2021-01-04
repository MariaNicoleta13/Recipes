import { CREATE_RECIPE, FETCH_RECIPES } from "../actions/types";
import _ from "lodash";

const recipeReducer = (state = {}, action) => {
  console.log("reducer recipe");
  console.log(action.payload);
  switch (action.type) {
    case CREATE_RECIPE:
      return { ...state, recipe: action.payload };
    case FETCH_RECIPES:
      return { ...state, ..._.mapKeys(action.payload, "id") };
    default:
      return state;
  }
};
export default recipeReducer;
