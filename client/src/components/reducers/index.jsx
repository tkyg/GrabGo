import { combineReducers } from "redux";
import errorsReducer from "./errorsReducer";
import restaurantsReducer from "./restaurantsReducer";
import usersReducer from "./usersReducer";
import menuItemsReducer from "./menuItemsReducer";
import reviewsReducer from "./reviewsReducer";

const rootReducer = combineReducers({
  errorsReducer,
  restaurantsReducer,
  menuItemsReducer,
  usersReducer,
  reviewsReducer
})

export default rootReducer;