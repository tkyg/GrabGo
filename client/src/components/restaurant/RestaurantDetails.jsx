import React, { useEffect } from 'react'
import { useParams, useNavigate, NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux'
import { deleteRestaurant, loadSingleRestaurant } from '../actions/restaurantActions'
import '../../styles/restaurantDetails.css'
import { loadReviews } from '../actions/reviewsActions';

const RestaurantDetails = ({ loading }) => {
  const dispatch = useDispatch()
  const navigate = useNavigate();

  const { id } = useParams();

  const singleRestaurant = useSelector(store => store.restaurantsReducer.singleRestaurant)
  const reviews = useSelector(store => store.reviewsReducer)
  const { currentUser, loggedIn } = useSelector(store => store.usersReducer)

  useEffect(() => {
    if(!loading && !loggedIn) {
      navigate('/login')
    } else {
      dispatch(loadSingleRestaurant(id));
      dispatch(loadReviews())
    }
  }, [loading, loggedIn, navigate, dispatch, id]);

  const isOwner = singleRestaurant && singleRestaurant.user && singleRestaurant.user.id && currentUser && singleRestaurant.user.id === currentUser.id;

  const filteredReviews = reviews.filter(
    review => review.restaurant.id === singleRestaurant.id
  );
  
  const handleDelete = () => {
    dispatch(deleteRestaurant(singleRestaurant.id, navigate))
  }
 
  return (
    <>
      {singleRestaurant && (
        <>
          <div className='singleRestaurant'>
            <div className="singleRestaurantWrapper">
              <h1 className='writeTitle'>{singleRestaurant.name}</h1>
            <br/>
              <p className='restaurantFont'>{singleRestaurant.description}</p>
            <br/>
              <p className='restaurantFont'>Address: {singleRestaurant.address}</p>
              <p className='restaurantFont'>Zip Code: {singleRestaurant.zip_code}</p>
              <p className='restaurantFont'>Contact Us At: {singleRestaurant.phone_number}</p>
            <br />
            <div>
              {loggedIn && isOwner && (
                <button className='button' onClick={() => 
                  navigate(`/restaurants/${singleRestaurant.id}/edit`, { 
                    restaurant: singleRestaurant 
                  })}
                >
                <div className="singleRestaurantEdit">
                  <i className="singleRestaurantIcon fa-regular fa-pen-to-square"> 
                    Edit Restaurant
                  </i>
                </div>
                </button>
              )}
            </div>  
              <div className='singleRestaurantDelete'>
                {loggedIn && isOwner && (
                  <i className="singleRestaurantIcon fa-regular fa-trash-can" onClick={handleDelete}>Delete Restaurant</i>
                )}
              </div>
            </div>
          </div>
          <br/>
          <br/>
          <div>
            <h2 className='writeTitle'>Menu</h2>
            <div className="singleRestaurantUpdate">
              {loggedIn && isOwner && (
                <NavLink style={{textDecoration: "none"}} to={'/menu_items'}>
                  <div className='singleMenuEdit'>
                    <button className="AddMenuItemButton"> 
                      Update Menu
                    </button>
                  </div>
                </NavLink>
              )}
            </div>
            {singleRestaurant.menu_items.map((menuItem) => (
              <div key={menuItem.id}>
                <h3 className='restaurantFontOne'>{menuItem.name} - ${menuItem.price}</h3>
                <p className='restaurantFontTwo'>{menuItem.description}</p>
                <p className='restaurantFont'>{menuItem.category}</p>
                <p className='restaurantFont'>{menuItem.is_vegetarian ? 'Vegetarian' : 'Non-Vegetarian'}</p>
                <p className='restaurantFont'>{menuItem.is_gluten_free ? 'Gluten-Free' : 'Non-Gluten-Free'}</p>    
                <br/>
              </div>
            ))}
          </div>
          <hr/>
          <br/>
          <div>
            <h2 className='writeTitle'>Comments</h2>
            <br/>
            {filteredReviews.map(review => (
              <div className='commentBlock' key={review.id}>
                <p className='commentFontUser'>User: {review.user.username}</p>
                <p className='commentFont'>Comment: {review.comment}</p>
                <p className='commentFont'>Rating: {review.rating}/5</p>
              </div>
            ))}
          </div>
          <br/>
        </>
      )}
    </>
  );
}

export default RestaurantDetails