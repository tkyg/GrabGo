import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { editRestaurant } from '../actions/restaurantActions'
import { clearErrors } from '../actions/errorActions'

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
    <div>
     <h3>Edit Restaurant</h3>
      <form onSubmit={ handleSubmit }>
        <div>
          <input
            type="text"
            name="name"
             id="name"
            placeholder="Name"
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
            value={ formData.address }
            onChange={ handleChange }
          />
        </div>
        <div>
          <input
            type="text"
            name="zip_code"
            placeholder="ZipCode"
            value={ formData.zip_code }
            onChange={ handleChange }
          />
        </div>
        <div>
          <input
            type="text"
            name="phone_number"
            placeholder="PhoneNumber"
            value={ formData.phone_number }
            onChange={ handleChange }
          />
        </div>
        <div>
          <input
            type="text"
            name="category"
            placeholder="Category"         
            value={ formData.category }
            onChange={ handleChange }
          />
        </div>
        <div>
          <input
            type="text"
            name="description"
            placeholder="Description"          
            value={ formData.description }
            onChange={ handleChange }
          />
        </div>
        <input type="submit" value="Update Restaurant" />
      </form>
    </div>
  )
}

export default RestaurantEdit
