import {
  USER_IN,
  USER_OUT,
  CREATE_RECIPE,
  FETCH_RECIPES,
  FETCH_RECIPE,
  CREATE_USER,
  FETCH_USER,
  EDIT_USER,
  DELETE_RECIPE,
  EDIT_RECIPE,
  DELETE_FAV_USER,
} from "./types";
import recipes from "../apis/recipes";
import history from "../history";
export const signIn = (user) => {
  return async (dispatch) => {
    // type: USER_IN,
    // payload: user,
    // const response = await recipes.post("/users", { ...user });
    dispatch({ type: USER_IN, payload: user });
  };
};
export const signOut = () => {
  return { type: USER_OUT };
};
export const createRecipe = (formValues) => {
  return async (dispatch, getState) => {
    const { isSignedIn } = getState().authentication;

    if (isSignedIn) {
      const { uid } = getState().authentication.user;
      //  console.log(uid);
      // console.log(formValues);
      const response = await recipes.post("/recipes", { ...formValues, uid });
      dispatch({ type: CREATE_RECIPE, payload: response.data });
      //programatic navigation:
      history.push("/");
    }
  };
};
export const addUser = () => {
  return async (dispatch, getState) => {
    const { isSignedIn } = getState().authentication;

    if (isSignedIn) {
      const { uid } = getState().authentication.user;

      const response = await recipes.post("/users", { ...uid });
      dispatch({ type: CREATE_USER, payload: response.data });
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
export const fetchUser = (id) => {
  return async (dispatch) => {
    const response = await recipes.get(`/users/${id}`);
    dispatch({ type: FETCH_USER, payload: response.data[0] });
  };
};
export const addFavToUser = (uid, recipeId) => {
  return async (dispatch) => {
    // console.log("din actions");
    // console.log("uid: " + uid);
    // console.log("recipeId: " + recipeId);
    await recipes.patch(`/favoriteIds/${uid}`, { recipeId });
    dispatch({ type: EDIT_USER, payload: recipeId });
    history.push("/");
  };
};

export const removeFavFromUser = (uid, recipeId) => {
  return async (dispatch) => {
    await recipes.delete(`/favoriteIds/${uid}`, { recipeId });
    dispatch({ type: DELETE_FAV_USER, payload: recipeId });
    history.push("/");
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
