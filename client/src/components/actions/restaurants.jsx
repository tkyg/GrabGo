
export const loadRestaurants = () => {
  return dispatch => {
    fetch('/restaurants')
    .then(response => response.json())
    .then(data => {
      const action = { type: "LOAD_RESTAURANTS", payload: data}
      dispatch(action)
    })
    .catch(error => {
      console.log(error) // or dispatch an action to handle the error
    })
  }
}

export const loadSingleRestaurant = (id) => {
  return dispatch => {
  fetch(`/restaurants/${id}`)
      .then(response => response.json())
      .then(data => {
        const action = {type: "LOAD_SINGLE_RESTAURANT", payload: data}
        dispatch(action)
      })
    }
  }

  export const filterRestaurantsByZipcode = (zipcode) => {
    return dispatch => {
      fetch(`/restaurants/zipcode/${zipcode}`)
      .then(response => response.json())
      .then(data => {
        const action = {type: 'FILTER_RESTAURANTS_BY_ZIPCODE',
        payload: data}
        dispatch(action);
      })
    };
  };
  
