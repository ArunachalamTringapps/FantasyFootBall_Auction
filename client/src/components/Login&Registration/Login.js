import React from 'react'
import "../../css/Login&Registrationcss/Login.css"
// import { Link } from 'react-router-dom'


function Login() {
  return (
    <div className='Login'>
      <div className='container'>
        <div className='left'>
          hii
        </div>
        <div className='header'>
          Login
        <form className='form'>
          <input type="text" placeholder='enter email id' className='email'></input>
          <input type="text" placeholder='enter password' className='password'></input>
         <div> <button className='signin'>Sign in</button></div>
        </form>
        <div className='createaccount'>Dont have an Account? Register</div>
        </div>
        

      </div>
    </div>
  )
}

export default Login