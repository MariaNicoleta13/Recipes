import { USER_IN, USER_OUT } from "../actions/types";

const initialState = {
  user: null,
  isSignedIn: false,
};

const authReducerFunction = (state = initialState, action) => {
  switch (action.type) {
    case USER_IN:
      return { ...state, user: action.payload, isSignedIn: true };
    case USER_OUT:
      return { ...state, user: null, isSignedIn: false };
    default:
      return state;
  }
};

export default authReducerFunction;
