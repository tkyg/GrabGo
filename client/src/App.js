
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Home from './components/home/Home';
import NavBar from './components/navbar/NavBar';

function App() {

  const reduxState = useSelector((store) => store.restaurantsReducer)
  console.log(reduxState)
  return (
    <div className="App">
      <Router>
        <NavBar />
        <Routes>
          <Route exact path="/" element={<Home />}/>
        </Routes>

      </Router>
    </div>
  );
}

export default App;
