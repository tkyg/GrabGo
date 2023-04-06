
const loadRestaurants = () => {

  return dispatch => {
    fetch('/restaurants')
    .then(response => response.json())
    .then(data => {
      const action = { type: "LOAD_RESTAURANTS", payload: data}
      dispatch(action)
    })
  }
}

export default loadRestaurants