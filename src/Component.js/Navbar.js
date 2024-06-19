import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Modal from "../Modal";
import Cart from "./Cart";
import { useCart } from "./ContextReducer";

const Navbar = () => {
  let data = useCart();
  const [cartView,setcartView]=useState(false)
  let History = useNavigate();
  const logOut = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userEmail");
    History("/login");
  };

  return (
    <nav class="navbar navbar-expand-lg navbar-dark bg-secondary">
      <div class="container-fluid">
        <Link class="navbar-brand" to="/">
          My Food App
        </Link>
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            <li class="nav-item">
              <Link class="btn btn-secondary" aria-current="page" to="/">
                Home
              </Link>
            </li>
            <li class="nav-item">
              <Link class="btn btn-secondary" to="/myorders">
                My Orders
              </Link>
            </li>
          </ul>
          {!localStorage.getItem("token") ?
            <div class="position-absolute top-0 end-0 my-2">
              <Link class="btn btn-secondary" to="/login" role="button">Login</Link>
              <Link class="btn btn-secondary" to="/signup" role="button">SignUp</Link>
            </div>
          : 
            <div class="position-absolute top-0 end-0 my-2">
            <button type="button" class="btn btn-secondary" to="/cart" onClick={()=>{setcartView(true)
              console.log("Started")
            }}>My Cart
            {data.length==0?"":
            <span class="badge badge-danger">{data.length}</span>}</button>
            {cartView?<Modal onClose={()=>{setcartView(false)
              console.log("Close")
            }}><Cart/></Modal>:null}
            <button class="btn btn-secondary mx-2" onClick={logOut}>Logout</button>
            </div>
          }
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
