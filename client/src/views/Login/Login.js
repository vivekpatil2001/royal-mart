
import React, { useState, useEffect } from 'react'
import "./Login.css"
import axios from "axios";
import {Link} from "react-router-dom"
import Navbar from '../../component/Navbar/Navbar';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');


  const login = async() => {
    if (email == '') {
      alert('Enter email')
      return
    }
    if (password == '') {
      alert('Enter pass')
      return
    }
    const response  = await axios.post('/login', {
      email:email,
      password:password
    })
    alert(response?.data?.message)

    if(response?.data?.success){
      localStorage.setItem('user', JSON.stringify(response?.data?.data));
      window.location.href = "/";
    }

  }
  
  useEffect(()=>{
    const storedUser = JSON.parse(localStorage.getItem("user") || "{}" );

    if(storedUser?.email){
      alert("you are already logged in!");
      window.location.href = "/"
    }
  },[])
  return (
    <div className='login-card'>
      <Navbar/>
      <form className='form-card-login'>
        <h1 className='text-center'>Login</h1>
        <input
          type='email'
          value={email}
          placeholder='Enter Email'
          className='input-box'
          onChange={(e) => {
            setEmail(e.target.value)
          }} />
        <input
          type='password'
          value={password}
          placeholder='Enter pass'
          className='input-box'
          onChange={(e) => {
            setPassword(e.target.value)
          }} />

          <button type='button' className='btn login-btn' onClick={login}>Login</button><br/><br/>
          <Link to='/signup' className='signup-btn1' >signup</Link>
                </form>
    </div>
  )
}

export default Login
