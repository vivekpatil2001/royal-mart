import React, { useState } from 'react'
import "./SignUp.css"
import axios from "axios";
import { Link } from 'react-router-dom';
import Navbar from '../../component/Navbar/Navbar';


function SignUp() {
   const [name , setName] = useState("")
   const [ email, setEmail] = useState("")
   const [password, setPassword] = useState("")
   const [ mobile, setMobile] = useState("")
   const [address, setAddress] = useState("")
   const [gender, setGender] = useState("male")


   const signUp = async()=>{

    if(!name){
      alert('name is required')
      return
    }
    if(!email){
      alert('email is required')
      return
    }
    if(!password){
      alert('password is required')
      return
    }
    if(!mobile){
      alert('mobile is required')
      return
    }
    if(!address){
      alert('adderess is required')
      return
    }
    if(!gender){
      alert('gender is required')
      return
    }

    const response = await axios.post('/signup', {
      name: name,
      email: email,
      password: password,
      mobile: mobile,
      address: address,
      gender: gender
    })

    alert(response?.data?.message);
  
    if(response?.data?.success){
     window.location.href = '/login';
   }
  };

  return (
    <div>
      <Navbar/>
      
      <form className=' form-card'>
      <h1 className='text-center'>SignUp</h1>

      <input 
      type='text'
       placeholder='Enter name'
       className='input-box'
        value={name}
        onChange={(e)=>{
              setName(e.target.value)
        }}
         />

      <input 
      type='email'
       placeholder='Enter email'
       className='input-box'
        value={email}
        onChange={(e)=>{
          setEmail(e.target.value)
        }}
         />

      <input 
      type='password'
       placeholder='Enter password'
       className='input-box'
        value={password}
        id="name"
        onChange={(e)=>{
          setPassword(e.target.value)
        }}
         />

      <input 
      type='text'
       placeholder='Enter mobile'
       className='input-box'
        value={mobile}
        id="mobile"
        onChange={(e)=>{
          setMobile(e.target.value)
        }}
         />

      <input 
      type='text'
       placeholder='Enter address'
       className='input-box'
        value={address}
        id="address"
        onChange={(e)=>{
          setAddress(e.target.value)
        }}
         />

      <input 
      type='text'
       placeholder='Enter gender'
       className='input-box'
        value={gender}
        id="gender"
        onChange={(e)=>{
          setGender(e.target.value)
        }}
         />
        <button type='button' className='signup-btn' onClick={signUp} >SignUp</button><br/><br/>
        <Link to='/login' className='login-btn1' >Login</Link>
      </form>
    </div>
  )
}

export default SignUp
// name: name,
// email: email,
// password: password,
// mobile: mobile,
// address: address,
// gender: gender