const reducer = (state = {}, action) => {
  switch (action.type) {
    case 'UPDATE_LIKED_LIST':
      const likedState = Object.assign({}, state, {
        items: action.items,
      });
      return likedState;
    
    default:
      return state;
  }
};
export default reducer;
