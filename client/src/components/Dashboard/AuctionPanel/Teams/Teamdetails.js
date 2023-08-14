


import React from 'react'
import axios from 'axios';
import { useState, useEffect } from 'react';
import "../Teams/Teams.css"
import { useNavigate } from 'react-router-dom';
function Teamdetails({ playersTeamsEdit }) {
  const [teamImage, setTeamImage] = useState(null);
  const [teamName, setTeamName] = useState('');
  const [teamOwnerName, setTeamOwnerName] = useState('');
  const [teamOwnerEmail, setTeamOwnerEmail] = useState('');
  const[auctionpoints,setauctionpoints]=useState('')
  const navigate=useNavigate();
  console.log("team", playersTeamsEdit);
  const email = localStorage.getItem("useremail")
  const auction_id = localStorage.getItem("AuctionId")
  useEffect(() => {
    axios.get(`http://localhost:5000/api/auctionpoints/pointsperteam/${auction_id}`)
      .then((response) => {
        setauctionpoints(response.data)
        console.log("auction points", auctionpoints)
      })
      .catch((err) => {
        console.error("Error fetching user data:", err);
      })
  }, [])
 
  const balance_amount=auctionpoints.points_per_team;
  console.log("auction points l", balance_amount)
  const handleImageChange = (e) => {
    setTeamImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('team_image', teamImage);
    formData.append('team_name', teamName);
    formData.append('team_owner_name', teamOwnerName);
    formData.append('team_owner_email_id', teamOwnerEmail);
    formData.append('auction_id',auction_id)
    formData.append('email_id',email)
    formData.append('balance_amount',balance_amount)

    try {
      const response = await axios.post('http://localhost:5000/api/teams/teamslist', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      console.log(response.data.message);
      navigate("/user/dashboard/teamlist")
      // Redirect or perform other actions on successful submission
    } catch (error) {
      console.error('Error submitting team:', error);
    }
    e.target.reset();
  };
  // const handleclickteam=()=>{
    
  // }
  return (
    <div className='team-container'>
      <div className='team-whole'>
        <div className='team-title'>
        Create a New Team
        </div>
        <form onSubmit={handleSubmit} autoComplete='off'>
        <div className='team-form'>
          <div className='team-inputs'>
            <label className='team-image-label'>Team Image:</label>
            <div className='team-image-upload'>
            <input type="file" onChange={handleImageChange} className='team-image-inputs' required/>
            </div>
          </div>
          <div className='team-inputs'>
            <label>Team Name:</label>
            <input type="text" value={teamName} onChange={(e) => setTeamName(e.target.value)} className='inputs' required/>
          </div>
          <div  className='team-inputs'>
            <label>Team Owner Name:</label>
            <input type="text" value={teamOwnerName} onChange={(e) => setTeamOwnerName(e.target.value)} className='inputs' required/>
          </div>
          <div  className='team-inputs'>
            <label>Team Owner Email:</label>
            <input type="email" value={teamOwnerEmail} onChange={(e) => setTeamOwnerEmail(e.target.value)} className='inputs' required/>
          </div>
          <button type="submit" className='team-created'>Create Team</button>
          </div>
        </form>
      
      </div>
    </div>
  );
}

export default Teamdetails
