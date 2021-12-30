const Reducer = (state, action) => {
  switch (action.type) {
    case "SET_COOKIES":
      return {
        ...state,
        cookies: action.payload,
      };
    case "SET_USER":
      return {
        ...state,
        currentUser: action.payload,
      };
    default:
      return state;
  }
};

export default Reducer;
