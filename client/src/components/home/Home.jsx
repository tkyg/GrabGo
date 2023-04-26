import React, { useEffect } from 'react'
import Header from '../header/Header'
import { useSelector, useDispatch } from 'react-redux'
import { NavLink, useNavigate } from 'react-router-dom'
import { loadRestaurants } from '../actions/restaurantActions'
import './home.css'

const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const { loggedIn, currentUser } = useSelector(store => store.usersReducer)
  console.log(currentUser)
  const restaurants = useSelector(store => store.restaurantsReducer.restaurants)
  console.log(restaurants)
  

  useEffect(() => {
    if(!loggedIn) {
      navigate('/login')
    }
    dispatch(loadRestaurants())
  }, [dispatch, loggedIn, navigate])

  const userRestaurant = restaurants.filter(restaurant => restaurant.user.id === currentUser.id);
  console.log(userRestaurant)
  
  if(loggedIn) {
    return (
      <>
        <Header />
        <div className='homeTop'>
          <div className='homeRight'>
            <img
            className="headerImg"
            src= "https://media.istockphoto.com/id/520410807/photo/cheeseburger.jpg?s=612x612&w=0&k=20&c=fG_OrCzR5HkJGI8RXBk76NwxxTasMb1qpTVlEM0oyg4="
            alt= "Burger"
            />
          </div>
          <div className='homeLeft'>
            <p>Welcome {currentUser.username}</p>
            {userRestaurant.length > 0 ? (
              <div>
                <p>Here are your registered restaurants:</p>
                <span>
                  {userRestaurant.map((restaurant) => (
                    <p key={restaurant.id}>
                      <NavLink style={{textDecoration: "none"}} to={`/restaurants/${restaurant.id}`}>{restaurant.name}</NavLink>
                    </p>
                  ))}
                </span>
                <br />
                <p>Click the link below to add more restaurants</p>
                <p><NavLink style={{textDecoration: "none"}} to='/restaurants/new'>Add New Restaurant</NavLink></p>
              </div>
            ) : (
              <>
                <p>Click on Add A New Restaurant</p>
                <p>Follow instructions to create your restaurant profile with us.</p>
                <p><NavLink style={{textDecoration: "none"}} to='/restaurants/new'>Add New Restaurant</NavLink></p>
              </>
            )}
          </div>
        </div>
      </>
    )
  } else {
    return (
    <>
      <Header />
      <div>
        <p>Welcome to GrubGo</p>
        <br/>
        <p>The site is currently available for only restaurant owners.</p>
        <br/>
        <p>If you have an account with us, navigate to Login.</p>
        <br/>
      </div>
    </>
    )
  }
}

export default Home