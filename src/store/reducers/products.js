const getDataReducer = (state = [], {type, payload}) => {
    switch (type) {
      case "GET_DATA":
        return payload || state
      case "GET_SEARCHED_DATA":
        return payload || state
      case "UPDATE_SEARCH":
        return payload || state
      default:
        return state
    }
}

export default getDataReducer;
