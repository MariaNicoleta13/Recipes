import { FETCH_USER, USER_OUT } from "../actions/types";

const usersReducer = (state = {}, action) => {
  switch (action.type) {
    // case CREATE_USER:
    //   return { ...state, user: action.payload };
    case FETCH_USER:
      return { ...action.payload };
    // case EDIT_USER:
    //   return { ...state, [action.payload.uid]: action.payload };
    case USER_OUT:
      return {};
    default:
      return state;
  }
};
export default usersReducer;
