import React from 'react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { clearErrors } from '../actions/errorActions';
import { addMenuItems } from '../actions/menuItemsActions'
import "../../styles/restaurantForm.css" 

const MenuItemsForm = ({ loading, restaurantId }) => {
  const initialState = {
    name: "",
    description: "",
    price: 0,
    category: "",
    is_vegetarian: false,
    is_gluten_free: false
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

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    })
  }

  const handleSubmit = e => {
    e.preventDefault()
    dispatch(addMenuItems(formData, navigate, restaurantId))
  }

  return (
    <div className="write">
      <h2 className="writeTitle">Menu Item Form</h2>
      {loading && <p>Loading...</p>}
        {!loading && (
          <form className='writeForm' onSubmit={handleSubmit}>
          <div>
            {/* <label htmlFor="name">Name:</label> */}
            <input
              type="text"
              name="name"
              id="name"
              placeholder="Name"
              className="writeInput"
              value={ formData.name }
              onChange={ handleChange }
            />
          </div>
          <div>
            {/* <label htmlFor="description">Description:</label> */}
            <input
              id="description"
              name='description'
              placeholder='Description'
              className="writeInput"
              value={ formData.description }
              onChange={ handleChange }
            />
          </div>
          <div>
            {/* <label htmlFor="price">Price:</label> */}
            <input
              type="number"
              id="price"
              name='price'
              placeholder='price'
              className="writeInput"
              value={ formData.price }
              onChange={ handleChange }
            />
          </div>
          <div>
            {/* <label htmlFor="category">Category:</label> */}
            <input
              type="text"
              id="category"
              name='category'
              placeholder='Category'
              className="writeInput"
              value={ formData.category }
              onChange={ handleChange }
            />
          </div>
          <div>
            <label htmlFor="isVegetarian">Vegetarian:</label>
            <input
              type="checkbox"
              id="isVegetarian"
              name='is_vegetarian'
              className="writeTitle"
              checked={formData.is_vegetarian}
              onChange={ handleChange }
            />
          </div>
          <div>
            <label htmlFor="isGlutenFree">Gluten-free:</label>
            <input
              type="checkbox"
              id="isGlutenFree"
              name='is_gluten_free'
              className="writeTitle"
              checked={formData.is_gluten_free}
              onChange={ handleChange }
            />
          </div>
          <button className="writeSubmit" type="submit">Save</button>
        </form>
      )}
    </div>    
  )
}

export default MenuItemsForm
