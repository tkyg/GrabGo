import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { editMenuItem } from '../actions/menuItemsActions';
import { clearErrors } from '../actions/errorActions';
import "../../styles/restaurantForm.css" 

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
  const { loggedIn } = useSelector(store => store.usersReducer)
  const [ formData, setFormData ] = useState(initialState)
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const menuItems = useSelector((store) => store.menuItemsReducer.menuItems);
  
  const menuItem = menuItems.find((menuItem) => menuItem.id === parseInt(id));
  
  useEffect(() => {
    if (!loading && !loggedIn) {
      navigate('/login')
    }
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
    return () => {
      dispatch(clearErrors())
    }
  }, [loading, loggedIn, navigate, dispatch, menuItem])

  // useEffect(() => {
  //   if (menuItem) {
  //     setFormData({
  //       name: menuItem.name,
  //       description: menuItem.description,
  //       price: menuItem.price,
  //       category: menuItem.category,
  //       is_vegetarian: menuItem.is_vegetarian,
  //       is_gluten_free: menuItem.is_gluten_free,
  //     });
  //   }
  // }, [menuItem]);

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
    <div className="write">
      <h2 className="writeTitle">Edit Menu Item</h2>
      <br/>
      <form className='writeForm' onSubmit={handleSubmit}>
        <div>
          {/* <label htmlFor="name">Name</label> */}
          <input
            type="text"
            name="name"
            id="name"
            placeholder="Name"
            className="writeInput"
            value={formData.name}
            onChange={handleChange}
          />
        </div>
        <div>
          {/* <label htmlFor="description">Description</label> */}
          <input
            name="description"
            id="description"
            className="writeInput"
            value={formData.description}
            onChange={handleChange}
          />
        </div>
        <div>
          {/* <label htmlFor="price">Price</label> */}
          <input
            type="number"
            name="price"
            className="writeInput"
            value={formData.price}
            onChange={handleChange}
          />
        </div>
        <div>
          {/* <label htmlFor="category">Category:</label> */}
            <input
              type="text"
              id="category"
              name='category'
              placeholder='category'
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
        <br/>
        <button className="writeSubmit" type="submit">Save</button>
      </form>
    </div>
  );
};

export default EditMenuItem;

