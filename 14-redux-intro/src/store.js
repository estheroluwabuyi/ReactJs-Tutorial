import { combineReducers, createStore } from "redux";
import accReducer from "./features/account/accountSlice";
import customerReducer from "./features/customers/customerSlice";

const rootReducer = combineReducers({
  account: accReducer,
  customer: customerReducer,
});

const store = createStore(rootReducer);

export default store;
