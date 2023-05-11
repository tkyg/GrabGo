const initialState = { 
  isLoading: true, 
  menuItems: [],
  error: null,
  restaurants: []
}

const menuItemsReducer = (state = initialState, action) => {
  console.log("Action dispatched:", action.type);
  switch(action.type){
    
    case "LOAD_MENU_ITEMS":
      // return action.payload;
      return {
        ...state, 
        isLoading: false,
        menuItems: action.payload
      };

    case "LOAD_SINGLE_MENU_ITEM":
      return { 
        ...state, 
        singleMenuItem: action.payload 
      };

    case "EDIT_MENU_ITEM":
      return {
        ...state,
        menuItems: state.menuItems.map((menuItem) =>
          menuItem.id === action.payload.id ? action.payload : menuItem
        ),
      };

    case "ADD_MENU_ITEM":
      const { restaurant_id, ...newMenuItem } = action.payload;
      const updatedRestaurants = state.restaurants.map((restaurant) => {
        if (restaurant.id === restaurant_id) {
          return {
            ...restaurant,
            menuItems: [...restaurant.menuItems, newMenuItem],
          };
        } else {
          return restaurant;
        }
      });
      return {
        ...state,
        restaurants: updatedRestaurants,
      };

    case "DELETE_MENU_ITEM":
      const filteredMenuItems = state.menuItems.filter(
        (menuItem) => menuItem.id !== action.payload
      );
      return {
        ...state,
        menuItems: filteredMenuItems,
      };
            
    default:
      return state
    }
  }
          
export default menuItemsReducer;


 // case "EDIT_MENU_ITEM":
    //   const updatedMenuItemIndex = state.menuItems.findIndex(
    //     (menuItem) => menuItem.id === action.payload.id
    //   );
    //   const updatedMenuItems = [...state.menuItems];
    //   updatedMenuItems[updatedMenuItemIndex] = action.payload;
    //   return {
    //     ...state,
    //     menuItems: updatedMenuItems,
    //   };

        // case "ADD_MENU_ITEM":
    //   const { restaurant_id, ...newMenuItem } = action.payload;
    //   const updatedRestaurants = state.restaurants.map((restaurant) => {
    //     if (restaurant.id === restaurant_id) {
    //       return {
    //         ...restaurant,
    //         menuItems: [...restaurant.menuItems, newMenuItem],
    //       };
    //     } else {
    //       return restaurant;
    //     }
    //   });
    //   return {
    //     ...state,
    //     restaurants: updatedRestaurants,
    //   };

    // case "ADD_MENU_ITEM":
    //   const updatedRestaurants = state.restaurants.map((restaurant) => {
    //     if (restaurant.id === action.payload) {
    //       return {
    //         ...restaurant,
    //         menuItems: [...restaurant.menuItems, action.payload],
    //       };
    //     } else {
    //       return restaurant;
    //     }
    //   });
    //   return {
    //     ...state,
    //     restaurants: updatedRestaurants,
    //   };
   