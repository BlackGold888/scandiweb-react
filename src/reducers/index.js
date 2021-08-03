import currencyReducer from "./currency";
import cartReducer from "./cartReduces";
import {combineReducers} from "redux";

const rootReducers = combineReducers({
    currency: currencyReducer,
    cartStore: cartReducer
})

export default rootReducers;

