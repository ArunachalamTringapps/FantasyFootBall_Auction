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
          <input type="text" placeholder='enter username'></input>
          <input type="text" placeholder='enter email id'></input>
          <input type="text" placeholder='enter password'></input>
          <button className='signin'>Sign in</button>
        </form>
        </div>

      </div>
    </div>
  )
}

export default Login