
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavBar from './components/navbar/NavBar';
import Home from './components/home/Home';
import Signup from './components/authentication/Signup'
import Login from './components/authentication/Login'
import RestaurantList from './components/restaurant/RestaurantList';
import RestaurantDetails from './components/restaurant/RestaurantDetails';
import RestaurantEdit from './components/restaurant/RestaurantEdit';
// import { useDispatch } from 'react-redux';
// import { useEffect } from 'react';
// import { loadRestaurants } from './components/actions/restaurants';

function App() {

  return (
    <div className="App">
      <Router>
        <NavBar />
        <Routes>
          <Route exact path="/" element={<Home />}/>
          <Route exact path="/signup" element={<Signup />}/>
          <Route exact path="/login" element={<Login />}/>
          <Route path="/restaurants" element={<RestaurantList />}/>
          <Route path="/restaurants/:id/edit" element={<RestaurantEdit />}/>
          <Route path="/restaurants/:id" element={<RestaurantDetails />}/>

        </Routes>

      </Router>
    </div>
  );
}

export default App;
