import logo from './logo.svg';
import './App.css';
import Navbar from './Component.js/Navbar';
import Home from './Component.js/Home';
import Login from './Component.js/Login';
import SignUp from './Component.js/SignUp';
import Cart from './Component.js/Cart';
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import MyOrders from './Component.js/MyOrders';
import { CardProvider } from './Component.js/ContextReducer';

function App() {
  
  return (
    <CardProvider>
  <Router>
  <div>
    <Routes>
              <Route exact path="/" element={<Home/>} />
              <Route exact path="/myorders" element={<MyOrders/>}/>
              <Route exact path="/login" element={<Login/>} />
              <Route exact path="/signup" element={<SignUp/>} />
    </Routes>
    </div>
  </Router>
    </CardProvider>
  );
}

export default App;
