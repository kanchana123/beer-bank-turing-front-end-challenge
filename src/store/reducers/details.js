const getDetailsReducer = (state = [], {type, payload}) => {
    switch (type) {
      case "GET_DETAILS":
        return payload || state
      default:
        return state
    }
}

export default getDetailsReducer;
