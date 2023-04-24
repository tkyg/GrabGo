import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { editMenuItem } from '../actions/menuItemsActions';
import { clearErrors } from '../actions/errorActions';

const EditMenuItem = ({ loading }) => {

  const initialState = {
    name: '',
    description: '',
    price: '',
    category: '',
    is_vegetarian: false,
    is_gluten_free: false,
  }
  
  const { id } = useParams();
  const { loggedIn, currentUser } = useSelector(store => store.usersReducer)
  const [ formData, setFormData ] = useState(initialState)
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const menuItems = useSelector((store) => store.menuItemsReducer.menuItems);
  console.log(menuItems)
  const menuItem = menuItems.find((menuItem) => menuItem.id === parseInt(id));
  console.log(menuItem)


  useEffect(() => {
    if (!loading && !loggedIn) {
      navigate('/login')
    }
    return () => {
      dispatch(clearErrors())
    }
  }, [loading, loggedIn, navigate, dispatch])

  useEffect(() => {
    if (menuItem) {
      setFormData({
        name: menuItem.name,
        description: menuItem.description,
        price: menuItem.price,
        category: menuItem.category,
        is_vegetarian: menuItem.is_vegetarian,
        is_gluten_free: menuItem.is_gluten_free,
      });
    }
  }, [menuItem]);

  

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(editMenuItem(id, formData));
    navigate('/menu_items');
  };

  const handleChange = (e) => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    setFormData({ ...formData, [e.target.name]: value });
    const updatedMenuItem = { ...menuItem, [e.target.name]: value };
    dispatch(editMenuItem(id, updatedMenuItem));
  };

  return (
    <div>
      <h2>Edit Menu Item</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Name</label>
          <input
            type="text"
            name="name"
            id="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="description">Description</label>
          <textarea
            name="description"
            id="description"
            value={formData.description}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="price">Price</label>
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
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
              checked={formData.is_vegetarian}
              onChange={ handleChange }
            />
        </div>
        <div>
          <label htmlFor="isGlutenFree">Gluten-free:</label>
            <input
              type="checkbox"
              id="isGlutenFree"
              name='isGlutenFree'
              checked={formData.is_gluten_free}
              onChange={ handleChange }
            />
        </div>

        <button type="submit">Save</button>
      </form>
    </div>
  );
};

export default EditMenuItem;

