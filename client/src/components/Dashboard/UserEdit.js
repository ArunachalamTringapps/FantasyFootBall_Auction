import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import "../../css/Dashboardcss/UserEdit.css"
const UserEdit = () => {
    const navigate = useNavigate()
    const email = localStorage.getItem("useremail")
   
    // const [newEmail, setnewemail] = useState('')
    const [newPassword, setnewpassword] = useState('')
    const [newUsername, setnewusername] = useState('')
    const handleclickedit = async (e) => {
       e.preventDefault();
        try {
            const response = await axios.put(`http://localhost:5000/api/settings/editdetails/${email}`, {
                new_password: newPassword,
                new_username: newUsername
            })
                navigate('/user/dashboard/setting');
        }
        catch (err) {
            console.log(err.message);
        }
        e.target.reset();
    }
    return (
        <div className='user-edit-container'>
            <div className='user-edit'>
                <div className='edit-title'>
                    User Edit Settings
                </div>
                
                <form onSubmit={handleclickedit} autoComplete='off'>
                <div className='user-details'>
                    <div className='new-password'><input type="password" placeholder="New Password" value={newPassword} onChange={(e) => setnewpassword(e.target.value)} /></div>
                    <div className='new-username'><input type="text" placeholder="New Username" value={newUsername} onChange={(e) => setnewusername(e.target.value)} /></div>
                    <div className='update-settings'><button type="submit">Update Settings</button></div>
                    </div>
                </form>
                </div>
            
        </div>
    )
}

export default UserEdit
