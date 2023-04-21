const initialState = { 
  isLoading: true, 
  menuItems: [],
  error: null,
  restaurants: []
}

const menuItemsReducer = (state = initialState, action) => {
  switch(action.type){
    case "LOAD_MENU_ITEMS":
      // return action.payload;
      return {
        ...state, 
        isLoading: false,
        menuItems: action.payload
      };

    case "LOAD_SINGLE_MENU_ITEM":
      return { ...state, singleMenuItem: action.payload };

    case "EDIT_MENU_ITEM":
      // const updatedMenuItems = state.map(menuItem => {
      //   if(action.payload.id === blog.id) {
      //     return action.payload;
      //   } else {
      //     return menuItem;
      //   }
      // })
      // return updatedMenuItems;
      const updatedMenuItemIndex = state.menuItems.findIndex(
        (menuItem) => menuItem.id === action.payload.id
      );
      const updatedMenuItems = [...state.menuItems];
      updatedMenuItems[updatedMenuItemIndex] = action.payload;
      return {
        ...state,
        menuItems: updatedMenuItems,
      };

    // case "ADD_MENU_ITEM":
    //   return {
    //     ...state,
    //     menuItems: [...state.menuItems, action.payload],
    //   };
    // case "ADD_MENU_ITEM":
    //   const restaurantId = action.payload.restaurant_id;
    //   const updatedRestaurants = state.restaurants.map((restaurant) => {
    //     if (restaurant.id === restaurantId) {
    //       return {
    //         ...restaurant,
    //         menu_items: [...restaurant.menu_items, action.payload],
    //       };
    //     } else {
    //     return restaurant;
    //     }
    //   });
    //   return {
    //     ...state,
    //     restaurants: updatedRestaurants,
    //     menuItems: [...state.menuItems, action.payload],
    //   };


    case "ADD_MENU_ITEM":
      const { menuItem, restaurant_id } = action.payload;
      const menuItems = [...state.menuItems, menuItem];
      const restaurants = state.restaurants.map((restaurant) => {
        if (restaurant.id === restaurant_id) {
          const menu_items = [...restaurant.menu_items, menuItem];
          return { ...restaurant, menu_items };
        } else {
          return restaurant;
        }
      });
      return { ...state, menuItems, restaurants };
    
    case "DELETE_MENU_ITEM":
      // return state.filter(menuItem => menuItem.id !== action.payload);
      const filteredMenuItems = state.menuItems.filter(
        (menuItem) => menuItem.id !== action.payload
      );
      return {
        ...state,
        menuItems: filteredMenuItems,
      };

      case "ADD_MENU_ITEMS_SUCCESS":
        return {
          ...state,
          restaurants: state.restaurants.map((restaurant) =>
            restaurant.id === action.payload.restaurantId
              ? {
                  ...restaurant,
                  menuItems: [...restaurant.menuItems, action.payload.menuItem],
                }
              : restaurant
          ),
        };

    default:
      return state
  }
}

export default menuItemsReducer;