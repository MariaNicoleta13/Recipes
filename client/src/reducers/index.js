import { combineReducers } from "redux";
import authReducer from "./authReducer";
import recipeReducer from "./recipeReducer";
import usersReducer from "./usersReducer";
export default combineReducers({
  authentication: authReducer,
  recipes: recipeReducer,
  user: usersReducer,
});
