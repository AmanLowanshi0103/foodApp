import React, { useContext, useState } from 'react'
import Navbar from './Navbar'
import { Link,useNavigate } from 'react-router-dom'

function Login() {
    let History=useNavigate()
    const [Password, setPassword] = useState("")
    const [Email, setEmail] = useState("")

    const handleSubmit = async (e) => {
        e.preventDefault()
        const response = await fetch(`http://localhost:4000/api/user/foodapp/loginuser`, {
            method: "POST", // *GET, POST, PUT, DELETE, etc.
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({Email,Password}),
        });
        const jason = await response.json();
        // console.log(jason)
        if(jason.success)
            {
                localStorage.setItem("userEmail",Email)
                localStorage.setItem("token",jason.token)
                History("/")
            }
    }
    return (
        <div>
            <>
                <div className='loginapp'>
                    <Navbar />
                    <div class="container d-flex align-items-center justify-content-center my-5">
                        <div class="h-100 d-inline-block w-50 p-3 ">
                            <form onSubmit={handleSubmit}>
                                <div class="mb-1 text-white">
                                    <label for="email" class="form-label">Email address</label>
                                    <input onChange={(e) => { setEmail(e.target.value) }} type="email" class="form-control" id="email" name="email" aria-describedby="emailHelp" />
                                </div>
                                <div class="mb-1 text-white">
                                    <label for="password" class="form-label">Password</label>
                                    <input onChange={(e) => { setPassword(e.target.value) }} type="password" class="form-control" id="password" name="password" aria-describedby="emailHelp" />
                                </div>
                                <button type="submit" class="btn btn-light my-3">Login</button>
                                <div class="mb-1 text-white my-3">
                                    <p>if your new user create your accout first <Link class="link-opacity-100" to="/SignUp">Create New Account</Link></p>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </>
        </div>
    )
}

export default Login
