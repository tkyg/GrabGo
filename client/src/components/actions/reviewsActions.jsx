export const loadReviews = () => {
  return dispatch => {
    fetch('/reviews')
    .then(response => response.json())
    .then(data => {
      console.log(data)
      const action = {
        type: "LOAD_REVIEWS",
        payload: data
      }
      dispatch(action)
    })
  }
}

