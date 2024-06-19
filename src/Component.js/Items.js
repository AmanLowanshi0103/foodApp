import Itemscard from './Itemscard'
import React, { useEffect, useState } from 'react'



const Items = () => {
  const [FoodItem,setFoodItem]=useState([])
  const [FoodCat,setFoodCat]=useState([])

  const FetchFoodData=async()=>
    {
      const response = await fetch(`http://localhost:4000/api/user/foodapp/DisplayData`, {
        method: "POST", // *GET, POST, PUT, DELETE, etc.
        headers: {
            "Content-Type": "application/json",
        },
    });
    const jason=await response.json()
    // console.log(jason[0],jason[1])
    setFoodItem(jason[0])
    setFoodCat(jason[1])
    }
    useEffect(()=>
    {
      FetchFoodData()
    },[])
  return (
    <div>
      {
        FoodCat!=[]
        ? FoodCat.map((data)=>{
          return(
            <div className='row mb-3'>
            <div className="text-white" key={data._id}>
            <h2>{data.CategoryName}</h2>
            </div>
            <b><hr/></b>
            {
              FoodItem!=[]
              ? FoodItem.filter((item)=> item.CategoryName==data.CategoryName).map((filteritem)=>{
                return (
                <div key={filteritem._id} className='col-18 col-md-3'>
                  <Itemscard FoodItem={filteritem} options={filteritem.options[0]}></Itemscard>
                </div>
                )
              }):<div>No such data found</div>
            }
            </div>
          )
        }):<div>No such data found</div>
      }
    </div>
  )
}

export default Items
