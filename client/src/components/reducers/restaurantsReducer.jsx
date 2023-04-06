

const restaurantsReducer = (state=[], action) => {
  switch(action.type){
    case "LOAD_RESTAURANTS":
      return action.payload;
    default:
      return state
  }
}

export default restaurantsReducer;