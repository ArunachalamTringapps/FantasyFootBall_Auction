import React from 'react'
import axios from 'axios';
import { useState, useEffect } from 'react';
import "../Players/CreatePlayer.css"
import { useNavigate } from 'react-router-dom';
// import image from "../../../../Image/upload-image.jpg"
import img from '../../../../Image/no-profile-img.gif';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const CreatePlayers = () => {
    // console.log("defaulteamvalue",defaulteamname)
  
    const [player_image, setnewPlayerImage] = useState(null);
    // const [newteamname, setnewTeamName] = useState('');
    // const [newteamownername, setnewTeamOwnerName] = useState('');
    // const [newteamemailid, setnewTeamOwnerEmail] = useState('');
    const [playerName,setPlayerName]=useState('');
    const [playerAge,setPlayerAge]=useState('');
    const [playerSkills,setPlayerSkills]=useState('');
    const [soldOrunsold,setsoldOrunsold]=useState('unsold');
    const [soldAmount,setsoldAmount]=useState(0);
    const [miminumBid,setmiminumBid]=useState('');
    const [Bit_increase_by,setBit_increase_by]=useState('');


    const navigate = useNavigate();
    const email = localStorage.getItem("useremail")
    const auction_id = localStorage.getItem("AuctionId")
   
    const handleImageChange = (e) => {
    //   setnewTeamImage(e.target.files[0]);
    };
  
    const handleSubmit = async (e) => {
        
   
    navigate("/user/dashboard/auctionpanel")
     
    };
    const handleBack = () => {
      navigate('/user/dashboard/auctionpanel')
    }
    return (
      <div className='playercreate-container'>
          <div className='playercreate-title'>
           Create a New Player
          </div>
            <div className='playercreate-form'>
              <div className='playercreate-image-inputs'>
                <label className='playercreate-image-label'>Player Image:</label>
                {player_image ? <img src={URL.createObjectURL(player_image)} className='playercreate-image' /> :(<img src={img} className='playercreate-image' />)}
                  <input type="file" onChange={handleImageChange} style={{display:"none"}} required />
              </div>
              <div className='playercreate-inputs'>
                <label>Player Name:</label>
                <input type="text"   className='inputs' defaultValue={playerName} onChange={(e)=>{setPlayerName(e.target.value)}} required />
              </div>
              <div className='playercreate-inputs'>
                <label>Player Age:</label>
                <input type="text"   className='inputs' defaultValue={playerAge} onChange={(e)=>{setPlayerAge(e.target.value)}} required />
              </div>
              <div className='playercreate-inputs'>
                <label>Player Skills:</label>
                <input type="email"   className='inputs' defaultValue={playerSkills} onChange={(e)=>{setPlayerSkills(e.target.value)}} required />
              </div>
              <div className='playercreate-inputs'>
                <label>minimum_bid:</label>
                <input type="email"   className='inputs' defaultValue={miminumBid} onChange={(e)=>{setmiminumBid(e.target.value)}} required />
              </div>
              <div className='playercreate-inputs'>
                <label>bit_increase_by:</label>
                <input type="email"   className='inputs' defaultValue={Bit_increase_by} onChange={(e)=>{setBit_increase_by(e.target.value)}} required />
              </div>
              <div className='playercreate-inputs'>
                <label>sold_or_unsold:</label>
                <input type="email"   className='inputs' defaultValue={soldOrunsold} onChange={(e)=>{setsoldOrunsold(e.target.value)}} required />
              </div>
              <div className='playercreate-inputs'>
                <label>sold_amount:</label>
                <input type="email"   className='inputs' defaultValue={soldAmount} onChange={(e)=>{setsoldAmount(e.target.value)}}  required />
              </div>
            </div>
        <div className='playercreate-created'>
                <button type="submit">Create Player</button>
                <button onClick={() => { handleBack() }}>Back</button>
          </div>
        <ToastContainer limit={1} position={'top-right'} pauseOnHover={false} pauseOnFocusLoss={false} draggable={false} closeOnClick={false} />
      </div>
    );
  
}

export default CreatePlayers
