import React from 'react'
import  { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
const UserDelete = () => {
    const email = localStorage.getItem('useremail');
  const [deleteemail, setdeleteEmail] = useState(email || '');
  const navigate = useNavigate()
  const handleDelete = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.delete(`http://localhost:5000/api/settings/deletedetails/${deleteemail}`);
      console.log(response.data.message);
    
      if (deleteemail === email) {
        localStorage.removeItem('useremail');
      }
      navigate('/user/dashboard/setting')
    } catch (error) {
      console.error('Error deleting account:', error);
    }
 
  };
  return (
    <div>
      <h2>Delete Account</h2>
      <input type="text" placeholder="Email" value={deleteemail} onChange={(e) => setdeleteEmail(e.target.value)} />
      <button onClick={handleDelete}>Delete Account</button>
    </div>
  )
}

export default UserDelete
