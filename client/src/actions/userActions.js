import {
  USER_IN,
  USER_OUT,
  CREATE_USER,
  EDIT_USER,
  DELETE_FAV_USER,
} from "./types";
import recipes from "../apis/recipes";
import history from "../history";

export const signIn = (id) => {
  return async (dispatch) => {
    const response = await recipes.get(`/users/${id}`);
    dispatch({ type: USER_IN, payload: response.data });
  };
};

export const signOut = () => {
  return { type: USER_OUT };
};

export const addUser = (user) => {
  return async (dispatch) => {
    const userObj = user;
    userObj.favoriteIds = [];
    userObj.id = userObj.uid;

    // const responseExistingUsers = await recipes.get(`/users/${userObj.id}`);
    let existsInDB = false;
    const responseExistingUsers = await recipes.get(`/users`);
    for (let index = 0; index < responseExistingUsers.data.length; index++) {
      var userObjDB = responseExistingUsers.data[index];
      if (userObjDB.id === userObj.id) {
        existsInDB = true;
        break;
      }
    }
    if (!existsInDB) {
      const response = await recipes.post(`/users`, userObj);
      dispatch({ type: CREATE_USER, payload: response.data });
    }

    //programatic navigation:
    history.push("/");
  };
};

export const addFavToUser = (uid, recipeId) => {
  return async (dispatch) => {
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
