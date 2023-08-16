import React from 'react'
import axios from 'axios';
import { useState, useEffect } from 'react';
import "../Teams/Teamdetails.css"
import { useNavigate } from 'react-router-dom';
import image from "../../../../Image/upload-image.jpg"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const Teamsedit = ({teamsedit,defaulteamname,defaulteamownername,defaulteamowneremail}) => {
    console.log("defaulteamvalue",defaulteamname)
  
    const [team_image, setnewTeamImage] = useState(null);
    const [newteamname, setnewTeamName] = useState('');
    const [newteamownername, setnewTeamOwnerName] = useState('');
    const [newteamemailid, setnewTeamOwnerEmail] = useState('');

    const navigate = useNavigate();
    const email = localStorage.getItem("useremail")
    const auction_id = localStorage.getItem("AuctionId")
   
    const handleImageChange = (e) => {
      setnewTeamImage(e.target.files[0]);
    };
  
    const handleSubmit = async (e) => {
        
      e.preventDefault();
      const formData = new FormData();
      formData.append('team_image', team_image);
      formData.append('newteamname', newteamname);
      formData.append('newteamownername', newteamownername);
      formData.append('newteamemailid', newteamemailid);
  
      try {
        const response = await axios.put(`http://localhost:5000/api/teamsedit/settings/${teamsedit}`, formData);
        toast.success('Team created successfully');
        console.log(response.data.message);
        setnewTeamImage(null)
        e.target.reset();
        navigate("/user/dashboard/auctionpanel")
  
      } catch (error) {
        console.error('Error submitting team:', error);
      }
     
    };
    const handleBack = () => {
      navigate('/user/dashboard/auctionpanel')
    }
    return (
      <div className='team-container'>
        <div className='team-whole'>
          <div className='team-title'>
           Team Edit Settings
          </div>
          <form onSubmit={handleSubmit} autoComplete='off'>
            <div className='team-form'>
              <div className='team-inputs'>
                <label className='team-image-label'>Team Image:</label>
                <div className='team-image-upload'>
                {team_image ? <img src={URL.createObjectURL(team_image)} className='team-image-upload' /> :(<img src={image} className='team-image-upload' />)}
                  <input type="file" onChange={handleImageChange} className='team-image-inputs' required />
                </div>
              </div>
              <div className='team-inputs'>
                <label>Team Name:</label>
                <input type="text"  onChange={(e) => setnewTeamName(e.target.value)} defaultValue={defaulteamname} className='inputs' required />
              </div>
              <div className='team-inputs'>
                <label>Team Owner Name:</label>
                <input type="text"  onChange={(e) => setnewTeamOwnerName(e.target.value)} defaultValue={defaulteamownername} className='inputs' required />
              </div>
              <div className='team-inputs'>
                <label>Team Owner Email:</label>
                <input type="email"  onChange={(e) => setnewTeamOwnerEmail(e.target.value)} defaultValue={defaulteamowneremail} className='inputs' required />
              </div>
              <div className='team-created'>
                <button type="submit">Update team</button>
                <button onClick={() => { handleBack() }}>Back</button>
              </div>
            </div>
          </form>
  
        </div>
        <ToastContainer limit={1} position={'top-right'} pauseOnHover={false} pauseOnFocusLoss={false} draggable={false} closeOnClick={false} />
      </div>
    );
  
}

export default Teamsedit
