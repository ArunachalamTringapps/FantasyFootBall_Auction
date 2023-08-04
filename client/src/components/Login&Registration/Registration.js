import React from 'react'
import "../../css/Login&Registrationcss/Registration.css"
import {Link, useNavigate} from 'react-router-dom'
import { useState } from 'react';

function Registration() {
  const navigate=useNavigate()
  const[email_id,setEmail_id]=useState('')
  const[password_user,setPassword_user]=useState('')
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [phone_no, setPhone_no] = useState('');
  const [retypePassword, setRetypePassword] = useState('');
 
  const handleRegister = async (e) => {
     e.preventDefault();
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if(!email_id){
      setError("Email is required")
      setTimeout(() => setError(''), 3000);
      return
    }
    if (!emailPattern.test(email_id)) {
      setError('Email should be in the correct format.');
      setTimeout(() => setError(''), 3000);
      return;
    }
    
    const phonePattern = /^\d{10}$/;
    if (!phone_no) {
      setError("Phone number is required");
      setTimeout(() => setError(''), 3000);
      return;
    }
    if (!phonePattern.test(phone_no)) {
      setError('Phone number should be exactly 10 digits.');
      setTimeout(() => setError(''), 3000);
      return;
    }

    // Validate password format using regular expression
    if (!password_user){
      setError('Password is required')
      setTimeout(() => setError(''), 3000);
      return
      
    }
    const passwordPattern = /^(?=.*[A-Za-z0-9@])[A-Za-z0-9@]{6}$/;
    if(!passwordPattern.test(password_user)) {
      setError('Password should have 6 alphanumeric characters.');
      setTimeout(() => setError(''), 3000);
      return
    }
    if(password_user.length>6){
      setError('Password must not exceed 6 alphanumeric characters')
      setTimeout(() => {
        setError('')
      },3000);
    }
    if (!retypePassword) {
      setError("Retype password is required");
      setTimeout(() => setError(''), 3000);
      return;
    }
    if(password_user!=retypePassword){
      setError('Password do not match Retype the correct password')
      setTimeout(()=>{
        setError('')
      },3000)
      return;
    }
    
    
    try {
      const response = await fetch('http://localhost:5000/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email_id, password_user}),
      });

      const data = await response.json();

      if (response.ok) {
        setError('');
        setTimeout(() => setError(''), 1000);
        console.log(data.message);
        navigate("/login")
      } else {
        setError(data.error);
        setTimeout(() => setError(''), 5000);
      }
    } 
    catch (error) {
      console.error('Error:', error);
      setError('An error occurred during registration.');
      setTimeout(() => setError(''), 5000);
    }
    e.target.reset();
  };

  return (
    <div className='Registration'>
    <div className='container-registration'>
      <div className='left-container'>
      
      </div>
      <div className='header-register'>
        Registration
      <form className='form' onSubmit={handleRegister}>
        <input type="text" placeholder='email...' value={email_id} className='email' onChange={(e)=>setEmail_id(e.target.value)}></input>
        <input type="number" placeholder='phoneno...' className='email' onChange={(e) => setPhone_no(e.target.value)}></input>
        <input type="password" placeholder='password...'  value={password_user}className='password' onChange={(e)=>setPassword_user(e.target.value)}></input>
        <input type="password" placeholder='Retype_password...' className='email' onChange={(e)=>setRetypePassword(e.target.value)}></input>
        <div className='error'>{error && <p>{error}</p>}</div>
       <div><button className='signin'>Sign in</button></div>
      </form>
      <div className='createaccount'>Already have an Account? <Link to="/login">Login</Link></div>
      </div>
      

    </div>
    
  </div>

  )
}

export default Registration