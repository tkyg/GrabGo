import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { editRestaurant } from '../actions/restaurantActions'
import { clearErrors } from '../actions/errorActions'
import "../../styles/restaurantForm.css" 

const RestaurantEdit = ({ loading }) => {
  
  const initialState = {
    name: "",
    address: "",
    zip_code: "",
    phone_number: "",
    category: "",
    description: ""
  }
  
  const { loggedIn, currentUser } = useSelector(store => store.usersReducer)
  const restaurants = useSelector(store => store.restaurantsReducer.restaurants)
  const [ formData, setFormData ] = useState(initialState)
  const { id } = useParams()
  const navigate = useNavigate()
  const dispatch = useDispatch()

  useEffect(() => {
    if(!loading && !loggedIn) {
      navigate('/login')
    }

    if(restaurants?.length > 0){
      const restaurant = restaurants.find(restaurant => restaurant.id === parseInt(id))

      if(!loading && currentUser.id !== restaurant.user.id) {
        navigate('/')
      }
      setFormData({
        name: restaurant.name,
        address: restaurant.address,
        zip_code: restaurant.zip_code,
        phone_number: restaurant.phone_number,
        category: restaurant.category,
        description: restaurant.description
      })
    }
    return () => {
      dispatch(clearErrors())
    }
  }, [restaurants, loading, currentUser, id, loggedIn, navigate, dispatch])

  const handleChange = event => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value
    })
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    dispatch(editRestaurant(id, formData, navigate))
  }
  
  return (
    <div className="write">
     <h3 className="writeTitle">Edit Restaurant</h3>
      <form className='writeForm' onSubmit={ handleSubmit }>
        <div>
          <input
            type="text"
            name="name"
            id="name"
            placeholder="Name"
            className="writeInput"
            autoFocus={true}
            value={ formData.name }
            onChange={ handleChange }
          />
        </div>
        <div>
          <input
            type="text"
            name="address"
            placeholder="Address"
            className="writeInput"
            value={ formData.address }
            onChange={ handleChange }
          />
        </div>
        <div>
          <input
            type="text"
            name="zip_code"
            placeholder="ZipCode"
            className="writeInput"
            value={ formData.zip_code }
            onChange={ handleChange }
          />
        </div>
        <div>
          <input
            type="text"
            name="phone_number"
            placeholder="PhoneNumber"
            className="writeInput"
            value={ formData.phone_number }
            onChange={ handleChange }
          />
        </div>
        <div>
          <input
            type="text"
            name="category"
            placeholder="Category"
            className="writeInput"         
            value={ formData.category }
            onChange={ handleChange }
          />
        </div>
        <div>
          <input
            type="text"
            name="description"
            placeholder="Description"
            className="writeInput"          
            value={ formData.description }
            onChange={ handleChange }
          />
        </div>
        <input className="writeSubmit" type="submit" value="Update Restaurant" />
      </form>
    </div>
  )
}

export default RestaurantEdit
