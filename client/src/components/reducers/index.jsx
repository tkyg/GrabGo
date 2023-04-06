import { combineReducers } from "redux";
import errorsReducer from "./errorsReducer";
import restaurantsReducer from "./restaurantsReducer";
import usersReducer from "./usersReducer";

const rootReducer = combineReducers({
  errorsReducer,
  restaurantsReducer,
  usersReducer
})

export default rootReducer;