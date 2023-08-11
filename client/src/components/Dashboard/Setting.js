import React from 'react'
import axios from 'axios'
import { useEffect } from 'react'
import { useState } from 'react';
import "../../css/Dashboardcss/Settings.css"
import { useNavigate } from 'react-router-dom';
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
    <div className='settings-container'>
      <div className='settings-details-container'>
        <div className='settings-title'>
          User Settings
        </div>
        <div className='settings-heading'>
          <div>Email_id</div>
          <div>Username</div>
          <div>Password</div>
          <div>Edit</div>
        </div>
        <div className='settings-show-details'>
          <div>{updateduserdetails.email_id}</div>
          <div>{updateduserdetails.username}</div>
          <div>{updateduserdetails.password_user}</div>
          <div><button className='edit' onClick={() => { handleedit() }}>Edit</button></div>
        </div>
      </div>
    </div>
  )
}

export default Setting