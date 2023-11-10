import React from 'react'
import { Link } from 'react-router-dom'
import './Navbar.css'

function Navbar() {
  return (
    <div className='navbar'>
    
        <div>
            <Link to='/' className='navbar-content'>
            RoyalMarket🛒🛍️
            </Link>
        </div>

        <div>
            <Link to='/login' className='navbar-content'>
                Login
            </Link>

            <Link to='/signup'className='navbar-content'>
                SignUp
            </Link>

            <Link to='/myorder'className='navbar-content'>
                My Order
            </Link>
        </div>

        <div>
            hello, user
        </div>
      
    </div>
  )
}

export default Navbar
