import { combineReducers } from "redux";
import authReducer from "./authReducer";
import recipeReducer from "./recipeReducer";
import seasonReducer from "./seasonReducer";
import usersReducer from "./usersReducer";
export default combineReducers({
  authentication: authReducer,
  recipes: recipeReducer,
  user: usersReducer,
  season: seasonReducer,
});
