const currencySwitcherReduces = (state = false, action) =>{
    if (action.type !== "CURRENCY_SWITCHER") {
        return state;
    }
    let newState = !state;
    return newState;
}
export default currencySwitcherReduces;
