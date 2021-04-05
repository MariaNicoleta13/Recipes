import {
  FETCH_USER,
  USER_OUT,
  EDIT_USER,
  DELETE_FAV_USER,
} from "../actions/types";
const usersReducer = (state = {}, action) => {
  switch (action.type) {
    // case CREATE_USER:
    //   return { ...state, user: action.payload };
    case FETCH_USER:
      return { ...action.payload };
    case EDIT_USER:
      state.favoriteIds.push(action.payload);
      return { ...state };
    case DELETE_FAV_USER:
      state.favoriteIds.splice(state.favoriteIds.indexOf(action.payload), 1);
      return { ...state };
    case USER_OUT:
      return {};
    default:
      return state;
  }
};
export default usersReducer;
