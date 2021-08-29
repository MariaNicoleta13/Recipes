import { combineReducers } from "redux";
import recipeReducer from "./recipeReducer";
import seasonReducer from "./seasonReducer";
import userReducer from "./userReducer";

export default combineReducers({
  recipes: recipeReducer,
  user: userReducer,
  season: seasonReducer,
});
