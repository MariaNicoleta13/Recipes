import { CHANGE_SEASON } from "../actions/types";
import { SEASON_ALL } from "../constants/seasons";
const seasonReducer = (state = SEASON_ALL, action) => {
  switch (action.type) {
    case CHANGE_SEASON:
      return action.payload;
    default:
      return state;
  }
};
export default seasonReducer;
