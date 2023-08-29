import { React } from 'react'
import "./Login.css"
import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useMutation, gql } from '@apollo/client';

const LOGIN_USER = gql`
  mutation loginUser($email_id: String!, $password_user: String!) {
    login(createUserInput: { email_id: $email_id, password_user: $password_user }) {
      token
      user {
        userId
        email_id
      }
    }
  }
`;

function Login(props) {
  const { email_id, setEmail_id } = props
  const navigate = useNavigate();
  const [password_user, setPassword_user] = useState('')
  const [loginUserMutation] = useMutation(LOGIN_USER);
  const handleLogin = async (e) => {
    e.preventDefault()
    if (!email_id) {
      toast.error("Email is required")
      return
    }
    if (!password_user) {
      toast.error('Password is required')
      return
    }

    // try {
      // const response = await fetch('http://localhost:5000/api/login/user', {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify({ email_id, password_user }),
      // });
      // const data = await response.json();
    //   const response = await loginUser({
    //     variables: { email_id: email_id, password_user: password_user},
    //   });
    //   if (response.ok) {
    //     localStorage.setItem("authentication", "true")
    //     localStorage.setItem("useremail", email_id)
    //     navigate('/user/dashboard')
    //     console.log(data.message);
    //   }
    //   else {
    //     toast.error(data.error);
    //   }
    // }
    // catch (error) {
    //   console.error('Error:', error);
    //   toast.error('Invalid Credentials');
    // }

    
    try {
      const response = await loginUserMutation({
        variables: { email_id: email_id, password_user: password_user },
      });

      const { login } = response.data;
console.log("response",email_id)
      if (login && login.token) {
        localStorage.setItem('authentication', 'true');
        localStorage.setItem('useremail', email_id);
        localStorage.setItem('token',login.token)
        navigate('/user/dashboard');
        console.log('User logged in successfully.');
      } else {
        toast.error('Error during login');
      }
    } catch (error) {
      console.error('Error:', error);
    
    
    if (error.graphQLErrors && error.graphQLErrors.length > 0) {
      toast.error(error.graphQLErrors[0].message);
    } else {
      toast.error('Invalid user credentials');
    }
  }
    e.target.reset();
  }

  return (
    <div className='Login'>
      <div onClick={() => navigate("/")} className='backButton'>Back</div>
      <div className='container'>
        <div className='left'>
        </div>
        <div className='header'>
          <h4>Login</h4>
          <form className='form' onSubmit={handleLogin} autoComplete='off'>
            <div className='input-box'>
              <input type="text" value={email_id} className='all-fields' onChange={(e) => { setEmail_id(e.target.value) }}></input>
              <label className="label-name">
                <span className='content-name'>Email_id...</span>
              </label>
            </div>
            <div className='input-box'>
              <input type="password" value={password_user} className='all-fields' onChange={(e) => setPassword_user(e.target.value)}></input>
              <label className="label-name">
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
      <div className='error'><ToastContainer limit={1} position={'top-right'} pauseOnHover={false} pauseOnFocusLoss={false} draggable={false} closeOnClick={false} /></div>

    </div>
  )
}

export default Login;