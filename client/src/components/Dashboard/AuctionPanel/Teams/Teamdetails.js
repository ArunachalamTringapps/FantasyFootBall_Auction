import React from 'react'
import axios from 'axios';
import { useState, useEffect } from 'react';
import "../Teams/Teamdetails.css"
import { useNavigate } from 'react-router-dom';
import image from "../../../../Image/upload-image.jpg"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function Teamdetails() {
  const [teamImage, setTeamImage] = useState(null);
  const [teamName, setTeamName] = useState('');
  const [teamOwnerName, setTeamOwnerName] = useState('');
  const [teamOwnerEmail, setTeamOwnerEmail] = useState('');
  const [auctionpoints, setauctionpoints] = useState('')
  const navigate = useNavigate();
  const email = localStorage.getItem("useremail");
  const auction_id = localStorage.getItem("AuctionId");
  useEffect(() => {
    axios.get(`http://localhost:5000/api/auctionpoints/pointsperteam/${auction_id}`)
      .then((response) => {
        setauctionpoints(response.data)
     })
      .catch((err) => {
        console.error("Error fetching auction data:", err);
      })
  }, [])

  const balance_amount = auctionpoints.points_per_team;
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
    formData.append('auction_id', auction_id)
    formData.append('email_id', email)
    formData.append('balance_amount', balance_amount)
console.log("formdata",formData)
    try {
      const response = await axios.post('http://localhost:5000/api/teams/teamslist', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      toast.success('Team created successfully');
      console.log(response.data.message);
      setTeamImage(null)
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
          Create a New Team
        </div>
        <form onSubmit={handleSubmit} autoComplete='off'>
          <div className='team-form'>
            <div className='team-inputs'>
              <label className='team-image-label'>Team Image:</label>
              <div className='team-image-upload'>
              {teamImage ? <img src={URL.createObjectURL(teamImage)} className='team-image-upload' /> :(<img src={image} className='team-image-upload' />)}
                <input type="file" onChange={handleImageChange} className='team-image-inputs'  />
              </div>
            </div>
            <div className='team-inputs'>
              <label>Team Name:</label>
              <input type="text"  onChange={(e) => setTeamName(e.target.value)} className='inputs' required />
            </div>
            <div className='team-inputs'>
              <label>Team Owner Name:</label>
              <input type="text"  onChange={(e) => setTeamOwnerName(e.target.value)} className='inputs' required />
            </div>
            <div className='team-inputs'>
              <label>Team Owner Email:</label>
              <input type="email"  onChange={(e) => setTeamOwnerEmail(e.target.value)} className='inputs' required />
            </div>
            <div className='team-created'>
              <button type="submit">Create Team</button>
              <button onClick={() => { handleBack() }}>Back</button>
            </div>
          </div>
        </form>

      </div>
      <ToastContainer limit={1} position={'top-right'} pauseOnHover={false} pauseOnFocusLoss={false} draggable={false} closeOnClick={false} />
    </div>
  );
}

export default Teamdetails
