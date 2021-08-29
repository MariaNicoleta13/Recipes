import {
  CREATE_RECIPE,
  FETCH_RECIPES,
  FETCH_RECIPE,
  DELETE_RECIPE,
  EDIT_RECIPE,
} from "../actions/types";
import _ from "lodash";

const recipeReducer = (state = {}, action) => {
  switch (action.type) {
    case EDIT_RECIPE:
    case FETCH_RECIPE:
    case CREATE_RECIPE:
      return { ...state, [action.payload.id]: action.payload };
    case FETCH_RECIPES:
      return { ...state, ..._.mapKeys(action.payload, "id") };
    case DELETE_RECIPE:
      return _.omit(state, action.payload);
    default:
      return state;
  }
};
export default recipeReducer;
