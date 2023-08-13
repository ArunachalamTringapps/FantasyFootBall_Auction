import React from 'react'
import axios from 'axios';
import { useState, useEffect } from 'react';
import "../Teams/Teams.css"
function Teams({ playersTeamsEdit }) {
  const [teamImage, setTeamImage] = useState(null);
  const [teamName, setTeamName] = useState('');
  const [teamOwnerName, setTeamOwnerName] = useState('');
  const [teamOwnerEmail, setTeamOwnerEmail] = useState('');
  console.log("team", playersTeamsEdit);
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

    try {
      const response = await axios.post('http://localhost:7000/api/teams', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      console.log(response.data.message);
      // Redirect or perform other actions on successful submission
    } catch (error) {
      console.error('Error submitting team:', error);
    }
    e.target.reset();

  };
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
            <div className='team-image'>
            <input type="file" onChange={handleImageChange} className='team-image-inputs'/>
            </div>
          </div>
          <div className='team-inputs'>
            <label>Team Name:</label>
            <input type="text" value={teamName} onChange={(e) => setTeamName(e.target.value)} className='inputs' />
          </div>
          <div  className='team-inputs'>
            <label>Team Owner Name:</label>
            <input type="text" value={teamOwnerName} onChange={(e) => setTeamOwnerName(e.target.value)} className='inputs'/>
          </div>
          <div  className='team-inputs'>
            <label>Team Owner Email:</label>
            <input type="email" value={teamOwnerEmail} onChange={(e) => setTeamOwnerEmail(e.target.value)} className='inputs' />
          </div>
          <button type="submit" className='team-created'>Create Team</button>
          </div>
        </form>
      
      </div>
    </div>
  );
}

export default Teams