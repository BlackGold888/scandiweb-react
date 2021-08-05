const currencyReducer = (state = 'USD', action) =>{
   if (action.type === 'CURRENCY_CHANGE') {
      return state = (action ? action.currencyName : 'USD');
   }
   return state;
}
export default currencyReducer;
