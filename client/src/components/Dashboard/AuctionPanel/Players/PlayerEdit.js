import React from 'react'
import axios from 'axios';
import { useState, useEffect } from 'react';
import "../Players/PlayersEdit.css"
import { useNavigate } from 'react-router-dom';
// import image from "../../../../Image/upload-image.jpg"
import img from '../../../../Image/no-profile-img.gif';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const PlayersEdit = ({playername,playerage,playerskills}) => {
    // console.log("defaulteamvalue",defaulteamname)
  
    const [player_image, setnewPlayerImage] = useState(null);
    // const [newteamname, setnewTeamName] = useState('');
    // const [newteamownername, setnewTeamOwnerName] = useState('');
    // const [newteamemailid, setnewTeamOwnerEmail] = useState('');

    const navigate = useNavigate();
    const email = localStorage.getItem("useremail")
    const auction_id = localStorage.getItem("AuctionId")
   
    const handleImageChange = (e) => {
    //   setnewTeamImage(e.target.files[0]);
    };
  
    const handleSubmit = async (e) => {
        
    //   e.preventDefault();
    //   const formData = new FormData();
    //   formData.append('team_image', team_image);
    //   formData.append('newteamname', newteamname);
    //   formData.append('newteamownername', newteamownername);
    //   formData.append('newteamemailid', newteamemailid);
  
    //   try {
    //     const response = await axios.put(`http://localhost:5000/api/teamsedit/settings/${teamsedit}`, formData);
    //     toast.success('Team created successfully');
    //     console.log(response.data.message);
    //     setnewTeamImage(null)
    //     e.target.reset();
    //     navigate("/user/dashboard/auctionpanel")
  
    //   } catch (error) {
    //     console.error('Error submitting team:', error);
    //   }
    navigate("/user/dashboard/auctionpanel")
     
    };
    const handleBack = () => {
      navigate('/user/dashboard/auctionpanel')
    }
    return (
      <div className='playeredit-container'>
        <div className='playeredit-title'>
           Player Edit Settings
          </div>
        <div className='playeredit-whole'>
          <form onSubmit={handleSubmit} autoComplete='off'>
            <div className='playeredit-form'>
              <div className='playeredit-inputs'>
                <label className='playeredit-image-label'>Player Image:</label>
                <div className='playeredit-image-upload'>
                {player_image ? <img src={URL.createObjectURL(player_image)} className='playeredit-image-upload' /> :(<img src={img} className='playeredit-image-upload' />)}
                  <input type="file" onChange={handleImageChange} className='playeredit-image-inputs' required />
                </div>
              </div>
              <div className='playeredit-inputs'>
                <label>Player Name:</label>
                <input type="text"  defaultValue={playername} className='inputs' required />
              </div>
              <div className='playeredit-inputs'>
                <label>Player Age:</label>
                <input type="text"   defaultValue={playerage} className='inputs' required />
              </div>
              <div className='playeredit-inputs'>
                <label>Player Skills:</label>
                <input type="email"   defaultValue={playerskills} className='inputs' required />
              </div>
            </div>
          </form>
  
        </div>
        <div className='playeredit-created'>
                <button type="submit">Update Player</button>
                <button onClick={() => { handleBack() }}>Back</button>
              </div>
        <ToastContainer limit={1} position={'top-right'} pauseOnHover={false} pauseOnFocusLoss={false} draggable={false} closeOnClick={false} />
      </div>
    );
  
}

export default PlayersEdit
