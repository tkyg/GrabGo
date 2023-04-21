import React from 'react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { clearErrors } from '../actions/errorActions';
import { addMenuItems } from '../actions/menuItemsActions'

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

  const handleChange = event => {
    const { name, value, type, checked } = event.target;
    console.log(value)
    setFormData({
      ...formData,
      // [name]: value
      [name]: type === 'checkbox' ? checked : value,
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addMenuItems(formData, navigate, restaurantId))
    setFormData(initialState)
  }

  return (
    <div>
      <h2>Menu Item Form</h2>
      {loading && <p>Loading...</p>}
        {!loading && (
          <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              name="name"
              id="name"
              placeholder="Name"
              value={ formData.name }
              onChange={ handleChange }
            />
          </div>
          <div>
            <label htmlFor="description">Description:</label>
            <textarea
              id="description"
              name='description'
              placeholder='description'
              value={ formData.description }
              onChange={ handleChange }
            />
          </div>
          <div>
            <label htmlFor="price">Price:</label>
            <input
              type="number"
              id="price"
              name='price'
              placeholder='price'
              value={ formData.price }
              onChange={ handleChange }
            />
          </div>
          <div>
            <label htmlFor="category">Category:</label>
            <input
              type="text"
              id="category"
              name='category'
              placeholder='category'
              value={ formData.category }
              onChange={ handleChange }
            />
          </div>
          <div>
            <label htmlFor="isVegetarian">Vegetarian:</label>
            <input
              type="checkbox"
              id="isVegetarian"
              name='isVegetarian'
              // checked={ formData.isVegetarian}
              defaultChecked={formData.is_vegetarian}
              onChange={ handleChange }
            />
          </div>
          <div>
            <label htmlFor="isGlutenFree">Gluten-free:</label>
            <input
              type="checkbox"
              id="isGlutenFree"
              name='isGlutenFree'
              defaultChecked={formData.is_gluten_free}
              onChange={ handleChange }
            />
          </div>
          <button type="submit">Save</button>
        </form>
      )}
    </div>
    
  )
}

export default MenuItemsForm

// create_table "menu_items", force: :cascade do |t|
// t.string "name"
// t.text "description"
// t.decimal "price", precision: 4, scale: 2
// t.string "category"
// t.boolean "is_vegetarian"
// t.boolean "is_gluten_free"
// t.integer "restaurant_id", null: false
// t.datetime "created_at", precision: 6, null: false
// t.datetime "updated_at", precision: 6, null: false
// t.index ["restaurant_id"], name: "index_menu_items_on_restaurant_id"
// end