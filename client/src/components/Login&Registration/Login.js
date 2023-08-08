import { React,useEffect } from 'react'
import "../../css/Login&Registrationcss/Login.css"
import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Login(props) {
  const {email_id,setEmail_id}=props

  const navigate = useNavigate();
  const [password_user, setPassword_user] = useState('')
  const [error, setError] = useState('');



  const handleLogin = async (e) => {
    e.preventDefault()
    if(!email_id){
      toast.error("Email is required")
      return
    }
    if (!password_user){
      toast.error('Password is required')
      return
    }

    try {
      const response = await fetch('http://localhost:5000/api/login/user', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email_id, password_user }),
      });

      const data = await response.json();
      
      if (response.ok) {
        localStorage.setItem("authentication","true")
        localStorage.setItem("useremail",email_id)
        setError('login successfully');
        navigate('/user/dashboard')
        console.log(data.message);
        
      }
      else {
          toast.error(data.error); 
      }
     
    } 
    catch (error) {
      console.error('Error:', error);
    
      toast.error('Invalid Credentials');
     
    }
    e.target.reset();
  }

  return (
    <div className='Login'>
      <div className='container'>
        <div className='left'>
        </div>
        <div className='header'>
          <h4>Login</h4>
            <form className='form' onSubmit={handleLogin} autoComplete='off'>
            <div className='input-box'>
            <input type="text" name="email"value={email_id} className='all-fields' onChange={(e) => {setEmail_id(e.target.value)}}></input>
            <label htmlFor="email" className="label-name">
              <span className='content-name'>Email_id...</span>
            </label>
            </div>
            <div className='input-box'>
            <input type="password" name="password"  value={password_user} className='all-fields' onChange={(e) => setPassword_user(e.target.value)}></input>
            <label htmlFor="password" className="label-name">
              <span className='content-name'>Password...</span>
            </label>
            </div>
            <div className='signinbutton'><button className='signin'>Sign in</button></div>
          </form>
          <div className='registerpageRoute'>
          <div className='createaccount'>Dont have an Account?</div> 
          <Link to="/register" className='link'>Register</Link>
          </div>
        </div>
      </div>
      <div className='error'><ToastContainer limit={1} position={'top-right'} pauseOnHover={false} pauseOnFocusLoss={false} draggable={false} closeOnClick={false}/></div>
      
    </div>
  )
}

export default Login;