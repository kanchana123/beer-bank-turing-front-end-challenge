const updateFavouritesReducer = (state = [], {type, payload}) => {
    switch (type) {
      case "UPDATE_FAV":
        return payload || state
      default:
        return state
    }
}

export default updateFavouritesReducer;
