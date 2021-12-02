import { combineReducers } from "redux";
import { catReducer } from "./cat/cat.reducer";

export const rootReducer = combineReducers({
  cat: catReducer,
});
