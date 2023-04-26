const initialState = []


const reviewsReducer = (state = initialState, action) => {
  switch(action.type){
    case "LOAD_REVIEWS":
      return action.payload
      default: 
        return state
  }
}

export default reviewsReducer