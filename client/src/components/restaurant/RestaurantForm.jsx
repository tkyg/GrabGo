import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { addRestaurant } from '../actions/restaurantActions';
import { useDispatch, useSelector } from 'react-redux';
import { clearErrors } from '../actions/errorActions'

const RestaurantForm = ({ loading }) => {

  const initialState = {
    name: "",
    address: "",
    zip_code: "",
    phone_number: "",
    category: "",
    description: ""
  }

  const [ formData, setFormData ] = useState(initialState);
  const { loggedIn } = useSelector(store => store.usersReducer);
  const navigate = useNavigate();
  const dispatch = useDispatch()

  useEffect(() => {
    if(!loading && !loggedIn) {
      navigate('/login')
    }
    return () => {
      dispatch(clearErrors())
    }
  }, [loading, loggedIn, navigate, dispatch])

  const handleChange = event => {
    const { name, value } = event.target;
    console.log(value)
    // dispatch(addRestaurant(formData, navigate))
    setFormData({
      ...formData,
      [name]: value
    })
  }

  const handleSubmit = e => {
    e.preventDefault();
    dispatch(addRestaurant(formData, navigate))
  }
  
  return (
    <div>
      <h2>RestaurantForm</h2>
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
            placeholder="Zip_Code"
            value={ formData.zip_code }
            onChange={ handleChange }
            />
        </div>
        <div>
          <input
            type="text"
            name="phone_number"
            placeholder="Phone_Number"
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
        <input type="submit" value="Create Restaurant" />
      </form>
    </div>
  )
}

export default RestaurantForm
// const handleSubmit = (event) => {
//   event.preventDefault()
//   dispatch(addRestaurant(formData, navigate))
// }

// const handleSubmit = async (event) => {
//   event.preventDefault()
//   const newRestaurantId = await dispatch(addRestaurant(formData))
//   navigate(`/restaurants/${newRestaurantId}`)
// }