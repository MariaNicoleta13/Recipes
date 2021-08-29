import {
  CREATE_RECIPE,
  FETCH_RECIPES,
  FETCH_RECIPE,
  DELETE_RECIPE,
  EDIT_RECIPE,
  CHANGE_SEASON,
} from "./types";
import recipes from "../apis/recipes";
import history from "../history";

export const createRecipe = (formValues) => {
  return async (dispatch, getState) => {
    const { isSignedIn } = getState().authentication;

    if (isSignedIn) {
      const { uid } = getState().authentication.user;
      const response = await recipes.post("/recipes", { ...formValues, uid });
      dispatch({ type: CREATE_RECIPE, payload: response.data });
      //programatic navigation:
      history.push("/");
    }
  };
};

export const fetchRecipes = () => {
  return async (dispatch) => {
    const response = await recipes.get("/recipes");
    dispatch({ type: FETCH_RECIPES, payload: response.data });
  };
};

export const fetchRecipe = (id) => {
  return async (dispatch) => {
    const response = await recipes.get(`/recipes/${id}`);
    dispatch({ type: FETCH_RECIPE, payload: response.data });
  };
};

export const deleteRecipe = (recipeId) => {
  return async (dispatch) => {
    await recipes.delete(`/recipes/${recipeId}`);
    dispatch({ type: DELETE_RECIPE, payload: recipeId });
    history.push("/");
  };
};

export const editRecipe = (id, formValues) => {
  return async (dispatch) => {
    const response = await recipes.patch(`/recipes/${id}`, formValues);
    dispatch({ type: EDIT_RECIPE, payload: response.data });
    history.push("/");
  };
};

export const changeSeason = (season) => {
  return { type: CHANGE_SEASON, payload: season };
};
