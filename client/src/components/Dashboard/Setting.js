import React from 'react'
import axios from 'axios'
import { useEffect } from 'react'
import { useState } from 'react';
import "../../css/Dashboardcss/Settings.css"
import { useNavigate } from 'react-router-dom';
import img from '../../Image/no-profile-img.gif';
function Setting() {
  const [updateduserdetails, setupdateduserdetails] = useState('')
  const email = localStorage.getItem("useremail")
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`http://localhost:5000/api/userdetails/${email}`)
      .then((response) => {
        setupdateduserdetails(response.data)
        console.log("upadted user", updateduserdetails)
      })
      .catch((err) => {
        console.error("Error fetching user data:", err);
      })
  }, [])
  const handleedit = () => {
    navigate('/user/dashboard/useredit')
  }
  return (
    <div className='setting'>
      <h1 className='Header'>User Settings</h1>
      <div className='settingcontainer'>
      <button className='edit-button'onClick={handleedit}>EDIT</button>
        <div className='imagecontainer'>
        {/* <img src='https://w7.pngwing.com/pngs/178/595/png-transparent-user-profile-computer-icons-login-user-avatars-thumbnail.png' className='image' /> */}
        <img src={img} className='image' />
        <input className='imagefield' type='file' />
        </div>
        <div className='userdetails'>
        <label className='label'>Username</label>
        <span className='dot namedot'>:</span>
        <span className='Details'>{updateduserdetails.username}</span>
        </div>
        <div className='userdetails'>
        <label className='label'>Password</label>
        <span className='dot passdot'>:</span>
        <span className='Details'>{updateduserdetails.password_user}</span>
        </div>
        <div className='userdetails'>
        <label className='label'>Phoneno</label>
        <span className='dot phonedot'>:</span>
        <span className='Details'>{updateduserdetails.phone_no}</span>
        </div>
        <div className='userdetails'>
        <label className='label'>Email</label>
        <span className='dot emaildot'>:</span>
        <span className='Details'>{updateduserdetails.email_id}</span>
        </div>
      </div>
    </div>
  )
}

export default Setting