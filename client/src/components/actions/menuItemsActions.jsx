export const loadMenuItems = () => {
  return dispatch => {
    fetch('/menu_items')
    .then(response => response.json())
    .then(data => {
      const action = { 
        type: "LOAD_MENU_ITEMS", 
        payload: data 
      }
      dispatch(action)
    })
    // .catch(error => {
    //   console.log(error) // or dispatch an action to handle the error
    // })
  }
}

export const loadSingleMenuItem = (id) => {
  return dispatch => {
  fetch(`/menu_item/${id}`)
      .then(response => response.json())
      .then(data => {
        const action = { 
          type: "LOAD_SINGLE_MENU_ITEM", 
          payload: data 
        }
        dispatch(action)
      })
    }
  }

export const editMenuItem = (id, formData, navigate) => {
  return dispatch => {
    // console.log(id)
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
      if(data.error){
        const action = {
          type: "SET_ERRORS",
          payload: data.errors
        }
        dispatch(action)
      } else {
      dispatch({
        type: "EDIT_MENU_ITEM",
        payload: data
      })
    }
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
        menu_item: formData,
        restaurant_id: restaurantId
      })
    })
    .then(response => response.json())
    .then(data => {
      if(data.errors){
        const action = {
          type: "SET_ERRORS",
          payload: data.errors
        }
        dispatch(action)
      } else {
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

export const deleteMenuItem = (id, navigate, restaurantId) => {
  return dispatch => {
    fetch(`/menu_items/${ id }`, {
      method: "DELETE"
    })
    .then(response => {
      if(response.ok) {
        const action = {
          type: "DELETE_MENU_ITEM",
          payload: id
        }
        dispatch(action)
        navigate(`/restaurants/${restaurantId}`)
      }
    })
  }
}