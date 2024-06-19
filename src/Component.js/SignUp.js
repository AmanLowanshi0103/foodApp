import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Navbar from './Navbar'

function SignUp() {
    let History=useNavigate()
    const [Form,setForm]=useState({Name:"",PhoneNumber:"",Email:"",Password:""})
    const onChange=(e)=>
        {
            console.log("Running")
            setForm({...Form,[e.target.name] : e.target.value})
        }
    const handleSubmit=async(e)=>
        {
            e.preventDefault()
            const {Name,Email,Password,PhoneNumber}=Form
            const response = await fetch(`http://localhost:4000/api/user/foodapp/createuser`, {
                method: "POST", // *GET, POST, PUT, DELETE, etc.
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({Name,Email,Password,PhoneNumber}),
            });
            const jason = await response.json();
            if(jason.success)
            {
                localStorage.setItem("userEmail",Email)
                localStorage.setItem("token",jason.token)
                History("/")
            }
        }
  return (
    <div className='signUpapp'>
      <Navbar/>
      <div class="container d-flex align-items-center justify-content-center my-5">
                 <div class="h-100 d-inline-block w-50 p-3 ">
                    <form onSubmit={handleSubmit}>
                        <div class="mb-1 text-white">
                            <label for="name" class="form-label">Name</label>
                            <input onChange={onChange} type="name" class="form-control" id="Name" name="Name" aria-describedby="emailHelp"/>
                        </div>
                        <div class="mb-1 text-white">
                            <label for="phonenumber" class="form-label">Phone Number</label>
                            <input onChange={onChange} type="phonenumber" class="form-control" id="PhoneNumber" name="PhoneNumber" aria-describedby="emailHelp"/>
                        </div>
                        <div class="mb-1 text-white">
                            <label for="Email" class="form-label">Email address</label>
                            <input onChange={onChange} type="Email" class="form-control" id="Email" name="Email" aria-describedby="emailHelp"/>
                        </div>
                        <div class="mb-1 text-white">
                            <label for="password" class="form-label">Password</label>
                            <input onChange={onChange} type="password" class="form-control" id="Password" name="Password" aria-describedby="emailHelp"/>
                        </div>
                        <div class="mb-1 text-white">
                            <label for="cpassword" class="form-label">Confirm Password</label>
                            <input type="cpassword" class="form-control" id="cpassword" name="cpassword" aria-describedby="emailHelp"/>
                        </div>
                        <button type="submit" class="btn btn-light my-3">Create an Account</button>
                    </form>
                </div>
              </div>
    </div>
  )
}

export default SignUp
