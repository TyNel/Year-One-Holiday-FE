const Reducer = (state, action) => {
  switch (action.type) {
    case "SET_COOKIES":
      return {
        ...state,
        cookies: action.payload,
      };
    default:
      return state;
  }
};
