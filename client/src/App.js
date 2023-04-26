
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavBar from './components/navbar/NavBar';
import Home from './components/home/Home';
import Signup from './components/authentication/Signup'
import Login from './components/authentication/Login'
import RestaurantList from './components/restaurant/RestaurantList';
import RestaurantDetails from './components/restaurant/RestaurantDetails';
import RestaurantEdit from './components/restaurant/RestaurantEdit';
import RestaurantForm from './components/restaurant/RestaurantForm';
import MenuItemsForm from './components/menuItems/MenuItemsForm';
import MenuItemsEdit from './components/menuItems/MenuItemsEdit'
import Errors from './components/errors/Errors';
import { loadCurrentUser, loadUsers } from './components/actions/userActions';
import { useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import MenuItemsList from './components/menuItems/MenuItemsList';
import Footer from './components/footer/Footer';
import ReviewList from './components/reviews/ReviewList';
// import { loadRestaurants } from './components/actions/restaurantActions';


function App() {
  const [loading, setLoading] = useState(true)
  const dispatch = useDispatch()
  
  useEffect(() => {
    dispatch(loadUsers(setLoading))
    dispatch(loadCurrentUser(setLoading))
  }, [dispatch])

  return (
    <div className="App">
      <Router>
        <NavBar />
        <Errors />
        {
          loading ? <h1>Loading...</h1>:
          <Routes>
            <Route exact path="/" element={ <Home /> }/>
            <Route exact path="/signup" element={ <Signup loading = { loading }/> }/>
            <Route exact path="/login" element={ <Login loading = { loading }/> }/>
            <Route path="/restaurants" element={ <RestaurantList loading = { loading }/> }/>
            <Route path="/restaurants/new" element={ <RestaurantForm loading = { loading }/> }/>
            <Route path="/restaurants/:id" element={ <RestaurantDetails loading = { loading }/> }/>
            <Route path="/restaurants/:id/edit" element={ <RestaurantEdit loading = { loading }/> }/>
            <Route path="/menu_items" element={ <MenuItemsList loading = { loading }/> }/>
            {/* <Route path="/menu_items/:id" element={ <MenuItemsList loading = { loading }/> }/> */}
            <Route path="/menu_items/new" element={ <MenuItemsForm loading = { loading }/> }/>
            <Route path="/menu_items/:id/edit" element={ <MenuItemsEdit loading = { loading }/> }/>
            <Route path="/reviews" element={<ReviewList loading = { loading }/>}/>
          </Routes>
          }
          <Footer />
      </Router>
    </div>
  );
}

export default App;
