import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { addRestaurant } from '../actions/restaurantActions';
import { useDispatch, useSelector } from 'react-redux';
import { clearErrors } from '../actions/errorActions'
import "../../styles/restaurantForm.css" 

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
    <div className="write">
      <h3 className="writeTitle">Please Fill in you Restaurant Details</h3>
    <br/>
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
            className="writeInput"
            placeholder="Address"
            value={ formData.address }
            onChange={ handleChange }
            />
        </div>
        <div>
          <input
            type="text"
            name="zip_code"
            placeholder="Zip Code"
            className="writeInput"
            value={ formData.zip_code }
            onChange={ handleChange }
            />
        </div>
        <div>
          <input
            type="text"
            name="phone_number"
            placeholder="Phone Number"
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
      <br/>
        <input className="writeSubmit" type="submit" value="Create Restaurant" />
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