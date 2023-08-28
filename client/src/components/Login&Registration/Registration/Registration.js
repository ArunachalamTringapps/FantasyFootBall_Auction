import React from 'react'
import "./Registration.css"
import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useMutation, gql } from '@apollo/client';



const REGISTER_USER = gql`
  mutation RegisterUser($email_id: String!, $password_user: String!) {
    RegisterUser(createUserInput: { email_id: $email_id, password_user: $password_user }) {
      email_id
    }
  }
`;


function Registration() {
  const navigate = useNavigate()
  const [email_id, setEmail_id] = useState('')
  const [password_user, setPassword_user] = useState('')
  // const [username, setusername] = useState('');
  const [retypePassword, setRetypePassword] = useState('');
  const [registerUser] = useMutation(REGISTER_USER);

  const handleRegister = async (e) => {
    e.preventDefault();
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email_id) {
      toast.error("Email is required")
      return
    }
    if (!emailPattern.test(email_id)) {
      toast.error('Email should be in the correct format.');
      return;
    }

    if (!password_user) {
      toast.error('Password is required')
      return

    }
    // if (!username) {
    //   toast.error("Username is required")
    //   return
    // }
    // const usernamePattern = /^[A-Za-z0-9]+$/;
    // if (!usernamePattern.test(username)) {
    //   toast.error("Username should contain only letters and numbers")
    //   return;
    // }
    const passwordPattern = /^(?=.*[A-Za-z0-9])[A-Za-z0-9]{6}$/;
    if (!passwordPattern.test(password_user)) {
      toast.error('Password should have 6 alphanumeric characters.');
      return
    }
    if (password_user.length > 6) {
      toast.error('Password must not exceed 6 alphanumeric characters')
      return
    }
    if (!retypePassword) {
      toast.error("Retype password is required");
      return;
    }
    if (password_user !== retypePassword) {
      toast.error('Password do not match Retype the correct password')
      return;
    }

    try {
      const response = await registerUser({
        variables: { email_id, password_user },
      });

      if (response.data.RegisterUser) {
        console.log('User registered successfully.');
        navigate('/login');
      } else {
        toast.error('Registration failed.');
      }
    } catch (error) {
      console.error('Error during registration:', error.message);
      if (error.graphQLErrors && error.graphQLErrors.length > 0) {
        toast.error(error.graphQLErrors[0].message);
      } else {
        toast.error('An error occurred during registration.');
      }
    }
    // try {
    //   const response = await fetch('http://localhost:5000/api/register', {
    //     method: 'POST',
    //     headers: {
    //       'Content-Type': 'application/json',
    //     },
    //     body: JSON.stringify({ email_id, password_user }),
    //   });

    //   const data = await response.json();

    //   if (response.ok) {
    //     console.log(data.message);
    //     navigate("/login")
    //   } else {
    //     toast.error(data.error);
    //   }
    // }
    // catch (error) {
    //   console.error('Error:', error);
    //   toast.error('An error occurred during registration.');
    // }
    e.target.reset();
  };

  return (
    <div className='Registration'>
      <div className='container-registration'>
        <div className='register-container'>
          <h4> Registration</h4>
          <form className='form-register' onSubmit={handleRegister} autoComplete='off'>
            <div className='input-fields'>
              <input type="text" value={email_id} className='all-input' onChange={(e) => setEmail_id(e.target.value)}></input>
              <label className="label-fields">
                <span className='content-fields'>Email_id...</span>
              </label>
            </div>
            {/* <div className='input-fields'>
              <input type="text" className='all-input' onChange={(e) => setusername(e.target.value)}></input>
              <label className="label-fields">
                <span className='content-fields'>Username...</span>
              </label>
            </div> */}
            <div className='input-fields'>
              <input type="password" value={password_user} className='all-input' onChange={(e) => setPassword_user(e.target.value)}></input>
              <label className="label-fields">
                <span className='content-fields'>Password...</span>
              </label>
            </div>
            <div className='input-fields'>
              <input type="password" className='all-input' onChange={(e) => setRetypePassword(e.target.value)}></input>
              <label className="label-fields">
                <span className='content-fields'>Retype_password...</span>
              </label>
            </div>
            <div><button className='signup'>Sign up</button></div>
          </form>
          <div className='loginpageRoute'>
            <div className='exist-account'>Already have an Account?</div>
            <Link to="/login" className='link'>Login</Link>
          </div>
        </div>
        <div className='header-register'>
        </div>
      </div>
      <ToastContainer limit={1} position={'top-right'} pauseOnHover={false} pauseOnFocusLoss={false} draggable={false} closeOnClick={false} />
    </div>

  )
}

export default Registration