// const initialState = { restaurantLoading: true, restaurants: [] }
const initialState = {
  restaurantLoading: true,
  restaurants: [],
  singleRestaurant: null
};

const restaurantsReducer = (state=initialState, action) => {
  // console.log("Action dispatched:", action.type);
  switch(action.type){

    case "LOAD_RESTAURANTS":
      // return action.payload;
      return {
        ...state, 
        restaurantLoading: false,
        restaurants: action.payload
      }

    case "LOAD_SINGLE_RESTAURANT":
      return { 
        ...state, 
        singleRestaurant: action.payload 
      };

    case "ADD_RESTAURANT":
      return {
        ...state,
        restaurants: [...state.restaurants, action.payload]
      };
    
    case "DELETE_RESTAURANT":
      const updatedRestaurantsAfterDelete = state.restaurants.filter(
        (restaurant) => restaurant.id !== action.payload
      );
      return {
        ...state,
        restaurants: updatedRestaurantsAfterDelete
      };

    case "EDIT_RESTAURANT":
      const updatedRestaurants = state.restaurants.map(restaurant => {
        if(action.payload.id === restaurant.id) {
          return action.payload
        } else {
          return restaurant
        }
      })
      return {
        ...state,
        restaurants: updatedRestaurants
      }

    default:
      return state
    }
  }
      
export default restaurantsReducer;

        //   case "LOAD_RESTAURANTS":
  // console.log("restaurants before loading: ", state.restaurants);
  // const newState = {
  //   ...state, 
  //   restaurantLoading: false,
  //   restaurants: action.payload
  // }
  // console.log("restaurants after loading: ", newState.restaurants);
  // return newState;