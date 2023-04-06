import React from 'react'
import { useSelector } from 'react-redux'

const Login = () => {

  const user = useSelector(store => store.usersReducer)

  return (
    <div>Login</div>
  )
}

export default Login