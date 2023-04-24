import { setErrors } from "./errorActions"

// this loads all restaurants
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

// this loads single restaurant
export const loadSingleRestaurant = (restaurantId) => {
  return dispatch => {
  fetch(`/restaurants/${restaurantId}`)
    .then(response => response.json())
    .then(data => {
      const action = {type: "LOAD_SINGLE_RESTAURANT", payload: data}
      dispatch(action)
    })
  }
}


export const addRestaurant = (formData, navigate) => {
  return dispatch => {
    fetch('/restaurants', {
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(formData)
    })
    .then(response => response.json())
    .then(data => {
      if(data.errors){
        dispatch(setErrors(data.errors))
      } else {
        // addMenuItem(data)
        // dispatch to MenuItemsReducer for adding a MenuItem
        const action = {
          type: "ADD_RESTAURANT",
          payload: data
        }
        dispatch(action)
        navigate('/restaurants')
      }
    })
  }
}

export const editRestaurant = (id, formData, navigate) => {
  return dispatch => {
    fetch(`/restaurants/${ id }`, {
      method: "PATCH",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData)
    })
    .then(response => response.json())
    .then(data => {
      if(data.error){
        dispatch(setErrors(data.error))
      } else {
        const action = {
          type: "EDIT_RESTAURANT",
          payload: data
        }
        dispatch(action)
        navigate('/restaurants')
      }
    })
  }
}

export const deleteRestaurant = (id, navigate) => {
  return dispatch => {
    fetch(`/restaurants/${id}`, {
      method: "DELETE"
    })
    .then(response => {
      console.log(response)
      if(response.ok) {
        const action = {
          type: "DELETE_RESTAURANT",
          payload: id
        }
        dispatch(action)
        navigate('/restaurants')
      }
    })
  }
}

  // changes made 4/12

  // export const filterRestaurantsByZipcode = (zipcode) => {
  //   return dispatch => {
  //     fetch(`/restaurants/zipcode/${zipcode}`)
  //     .then(response => response.json())
  //     .then(data => {
  //       const action = {type: 'FILTER_RESTAURANTS_BY_ZIPCODE',
  //       payload: data}
  //       dispatch(action);
  //     })
  //   };
  // };
  
  // this allows me to add a restaurant