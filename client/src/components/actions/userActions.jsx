import { setErrors, clearErrors } from "./errorActions"

export const loadUsers = (setLoading) => {
  return dispatch => {
    fetch("/users")
    .then(resp => resp.json())
    .then(data => {
      const action = {
        type: "LOAD_USERS",
        payload: data
      }
      setLoading(false)
      dispatch(action);
    })
  }
}

export const loadCurrentUser = (setLoading) => {
  return dispatch => {
    fetch('/me')
      .then(resp => resp.json())
      .then(data => {
        if(!data.error) {
          // dispatch an action that updates the store with the currentUser and logs us in
          // loginUser(data)
          const action = {
            type: "LOGIN_USER",
            payload: data
          }
          dispatch(action);
        } else {
          setLoading(false);
        }
      })
  }
}

export const loginUser = (user, navigate) => {
  return dispatch => {
    fetch("/login", {
      method: "POST",
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(user)
    })
      .then(resp => resp.json())
      .then(data => {
        if(data.errors) {
          dispatch(setErrors(data.errors));
        } else {
          const action = {
            type: "LOGIN_USER",
            payload: data
          }
          dispatch(action)
          dispatch(clearErrors())
          navigate("/")
        }
      })
  }
}

export const signupUser = (user, navigate) => {
  return dispatch => {
    fetch("/signup", {
      method: "POST",
      headers: { 'Content-Type': 'application/json'},
      body: JSON.stringify({user}),
    })
      .then(resp => resp.json())
      .then(data => {
        if(data.errors) {
          dispatch(setErrors(data.errors));
        } else {
          dispatch({
            type: "LOGIN_USER",
            payload: data
          })
          dispatch({
            type: "ADD_USER",
            payload: data
          })
          navigate("/")
        }
      })
  }
}
export const logoutUser = (navigate) => {
  return (dispatch) => {
    console.log("Before dispatching LOGOUT_USER action");
    fetch('/logout', { method: "DELETE" })
      .then(response => {
        
          dispatch({ 
            type: 'LOGOUT_USER' 
          });
          console.log("After dispatching LOGOUT_USER action");
          navigate('/login')
        
      })
      .catch((error) => {
        console.log(error)
      })
  }
}
