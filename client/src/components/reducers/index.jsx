import { combineReducers } from "redux";
import errorsReducer from "./errorsReducer";
import restaurantsReducer from "./restaurantsReducer";
import usersReducer from "./usersReducer";
import menuItemsReducer from "./menuItemsReducer";

const rootReducer = combineReducers({
  errorsReducer,
  restaurantsReducer,
  menuItemsReducer,
  usersReducer
})

export default rootReducer;