
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';
import NavBar from './components/navbar/NavBar';
import Home from './components/home/Home';
import Signup from './components/authentication/Signup'
import Login from './components/authentication/Login'
import RestaurantList from './components/restaurant/RestaurantList';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import loadRestaurants from './components/actions/restaurants';

function App() {

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadRestaurants())
  }, [dispatch])

  const reduxState = useSelector((store) => store.restaurantsReducer)
  console.log(reduxState)
  return (
    <div className="App">
      <Router>
        <NavBar />
        <Routes>
          <Route exact path="/" element={<Home />}/>
          <Route exact path="/signup" element={<Signup />}/>
          <Route exact path="/login" element={<Login />}/>
          <Route path="/restaurants" element={<RestaurantList />}/>

        </Routes>

      </Router>
    </div>
  );
}

export default App;
