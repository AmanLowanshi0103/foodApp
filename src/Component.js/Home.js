import React from 'react'
import Navbar from './Navbar'
import Footer from './Footer'
import Items from './Items'

function Home() {
    return (
        <div>
            <Navbar />
            <div className='bg-dark'>
            <Items/>
            </div>
        </div>
    )
}

export default Home
