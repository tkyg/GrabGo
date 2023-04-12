const initialState = { restaurantLoading: true, restaurants: [] }

const restaurantsReducer = (state=initialState, action) => {
  switch(action.type){
    case "LOAD_RESTAURANTS":
      // return action.payload;
      return {
        ...state, 
        restaurantLoading: false,
        restaurants: action.payload
      }

    case "LOAD_SINGLE_RESTAURANT":
      return { ...state, singleRestaurant: action.payload };
      // return action.payload;

    default:
      return state
  }
}

export default restaurantsReducer;