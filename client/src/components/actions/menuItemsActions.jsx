export const loadMenuItems = () => {
  return dispatch => {
    fetch('/menu_items')
    .then(response => response.json())
    .then(data => {
      const action = { type: "LOAD_MENU_ITEMS", payload: data }
      dispatch(action)
    })
    .catch(error => {
      console.log(error) // or dispatch an action to handle the error
    })
  }
}

export const loadSingleMenuItem = (id) => {
  return dispatch => {
  fetch(`/menu_item/${id}`)
      .then(response => response.json())
      .then(data => {
        const action = { type: "LOAD_SINGLE_MENU_ITEM", payload: data }
        dispatch(action)
      })
    }
  }

export const editMenuItem = (id, formData, navigate) => {
  return dispatch => {
    fetch(`/menu_items/${id}`, {
      method: "PATCH",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(formData)
    })
    .then(response => response.json())
    .then(data => {
      //dispatch action 
      dispatch({
        type: "EDIT_MENU_ITEM",
        payload: data
      })
      navigate('/menu_items')
    })
  }
}

export const addMenuItems = (formData, navigate, restaurantId) => {
  console.log(formData)
  return dispatch => {
    fetch('/menu_items', {
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        menuItem: formData,
        restaurant_id: restaurantId
      })
    })
    .then(response => response.json())
    .then(data => {
      if(data.errors){
        // dispatch to ErrorsReducer for error handling
        // setErrors(data.errors)
        const action = {
          type: "SET_ERRORS",
          payload: data.errors
        }
        dispatch(action)
      } else {
        // addMenuItem(data)
        // dispatch to MenuItemsReducer for adding a MenuItem
        const action = {
          type: "ADD_MENU_ITEM",
          payload: data
        }
        dispatch(action)
        navigate(`/restaurants/${restaurantId}`)
      }
    })
  }
}

export const deleteMenuItem = (id) => {
  return dispatch => {
    fetch(`/menu_items/${ id }`, {
      method: "DELETE",
      headers: {
        "Accept": "application/json"
      }
    })
    .then(response => response.json())
    .then(data => {
      const action = {type: "DELETE_MENU_ITEM", payload: data}
      dispatch(action)
    })
  }
}