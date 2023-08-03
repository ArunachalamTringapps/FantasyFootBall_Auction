import { React, useEffect } from 'react'
import "../../css/Login&Registrationcss/Login.css"
import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react';



function Login() {
  const navigate = useNavigate();
  const [email_id, setEmail_id] = useState('')
  const [password_user, setPassword_user] = useState('')
  const [error, setError] = useState('');
  const [showError, setShowError] = useState(false);
  const handleLogin = async (e) => {
    e.preventDefault()
    if(!email_id){
      setError("Email is required")
      setTimeout(() => setError(''),
       3000);
      return
    }
    if (!password_user){
      setError('Password is required')
      setTimeout(() => setError(''), 3000);
      return
    }

    try {
      const response = await fetch('http://localhost:5000/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email_id, password_user }),
      });

      const data = await response.json();

      if (response.ok) {
        setError('login successfully');
        setTimeout(() =>navigate('/dashboard'), 1000);
        console.log(data.message);
        
      }

      else {
        setError(data.error);
        setTimeout(() => setError(''), 3000);
      }
    } 
    catch (error) {
      console.error('Error:', error);
      setError('Invalid Credentials');
      setTimeout(() => setError(''), 3000);
    }
    e.target.reset();
  }

  return (
    <div className='Login'>
      <div className='error'>{error && <p>{error}</p>}</div>
      <div className='container'>
        <div className='left'>
        </div>
        <div className='header'>
          Login
          <form className='form' onSubmit={handleLogin}>
            <input type="text" placeholder='email id...' value={email_id} className='email' onChange={(e) => setEmail_id(e.target.value)}></input>
            <input type="password" placeholder='password...' value={password_user} className='password' onChange={(e) => setPassword_user(e.target.value)}></input>
            <div><button className='signin'>Sign in</button></div>
          </form>
          <div className='createaccount'>Dont have an Account? <Link to="/register" className='link'>Register</Link></div>
        </div>
      </div>
      
    </div>
  )
}

export default Login;