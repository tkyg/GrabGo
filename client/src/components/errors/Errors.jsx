import React from 'react'
import { useSelector } from 'react-redux'

const Errors = () => {

  const errors = useSelector(store => store.errorsReducer)
  
  // if (errors.length === 0) {
  //   return null;
  // }
  const errorList = errors.map((error, index) => <li key={index}>{error}</li>)

  return (
    <div>
      <ul>
        {errorList}
      </ul>
    </div>
  )
}

export default Errors