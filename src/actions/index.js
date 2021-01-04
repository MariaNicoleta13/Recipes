import { USER_IN, USER_OUT, CREATE_RECIPE, FETCH_RECIPES } from "./types";
import recipes from "../apis/recipes";
import history from "../history";
export const signIn = (user) => {
  return {
    type: USER_IN,
    payload: user,
  };
};
export const signOut = () => {
  return { type: USER_OUT };
};
export const createRecipe = (formValues) => {
  return async (dispatch, getState) => {
    const { isSignedIn } = getState().authenticatication;

    if (isSignedIn) {
      const { uid } = getState().authenticatication.user;
      //  console.log(uid);
      console.log(formValues);
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
