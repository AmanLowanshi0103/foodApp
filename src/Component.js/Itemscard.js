import React, { useEffect, useState } from 'react'
import { useCart, useDispatchCart } from './ContextReducer'

const Itemscard = (props) => {
  let Options=props.options
  let PriceOptions=Object.keys(Options)
  const [qty,setQty]=useState(1)
  const [size,setSize]=useState(PriceOptions[0])
  let FinalPrice=qty*parseInt(Options[size])
  let dispatch=useDispatchCart();
  let data=useCart();
  
  const handleAddTocart=async()=>
    {
      await dispatch({type:"Add",id:props.FoodItem._id,name:props.FoodItem.name,price:FinalPrice,qty:qty,size:size,img:props.FoodItem.img})/////// no where to start
      console.log(data)

    }
    return (
      <div className="card mt-3" style={{ "width": "17rem","maxHeight":"380px" }}>
      <img src={props.FoodItem.img} className="card-img-top" alt="..." />
      <div className="card-body">
        <h5 className="card-title">{props.FoodItem.name}</h5>
        {/* <p className="card-text">{props.description}</p> */}
        <div className='container w-100'>
          <select className='m-2 h-100 bg-success rounded' onChange={(e)=>setQty(e.target.value)}>
            {Array.from(Array(6),(e,i)=>{
              return(
                <option key={i+1} value={i+1}>{i+1}</option>
              )
            })}
            </select>
            <select className='m-2 h-100 bg-success rounded' onChange={(e)=>setSize(e.target.value)}>
              {
                PriceOptions.map((data)=>
                {
                 return(<option key={data} value={data}>{data}</option>)
                })
              }
            </select>
            <div className='d-inline h-100 fs-5'>
            ₹{FinalPrice}/-
            </div>
        </div>
        <hr/>
        <button className='btn btn-success justify-content-center MCard text-dark' onClick={handleAddTocart}>Add To Cart</button>
      </div>
    </div>
    
    )
}

export default Itemscard
