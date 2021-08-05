import currencyReducer from "./currency";
import cartReducer from "./cartReduces";
import currencySwitcherReduces from "./currencySwitcherReduces";
import {combineReducers} from "redux";

const rootReducers = combineReducers({
    currency: currencyReducer,
    cartStore: cartReducer,
    currencySwitcherReducer: currencySwitcherReduces

})

export default rootReducers;
