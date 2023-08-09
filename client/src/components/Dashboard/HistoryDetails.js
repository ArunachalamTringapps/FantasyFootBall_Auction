import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import "../../css/Dashboardcss/HistoryDetails.css"
import profile from"../../Image/no-profile-img.gif"
import axios from 'axios';
function HistoryDetails(props) {
  const{teamhistory}=props
  console.log("teamhistory",teamhistory);
  const email=localStorage.getItem("useremail")
  console.log(teamhistory)
  const [teamdetails, setteamdetails] = useState([]);
  const[playerdetails,setplayerdetails]=useState([])
  useEffect(() => {
    axios.get(`http://localhost:5000/api/details/historyauction/auction/${teamhistory}`)
    .then((response)=>{
      setteamdetails(response.data)
    })
    .catch((err)=>{
      console.error(err);
    })
  }, [teamhistory]);
  useEffect(() => {
    const fetchallplayerdetails = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/details/players/${email}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        const playerdata = await response.json();
        console.log("players",playerdata)
        setplayerdetails(playerdata);
      }
      catch (error) {
        console.error(error.message);
      }
    };

    fetchallplayerdetails();
  }, []);
  return (
    <div className='historydetails-container'>
      <div className='teamdetails'>
        <div className='teamview'>
      <div className='team-title'>
        Team Details
      </div>
      {
      teamdetails.map((val,index)=>{
        return( <div key={index} className='teamlist'>
        <div className='team-image'>
          {val.team_image ? (
            <img src={val.team_image} alt={`Team ${val.team_id}`} />
            ) : (
            <img src={profile} alt='Default' />
          )}
        </div>
        <div className='team-id-details'>{val.team_name}</div>
        <div className='team-owner-details'>{val.team_owner_name}</div>
        <div>{val.players}</div>
        </div>
        )
      })
      }
     </div>
      <div className='player-container'>
        players
     
      {
        playerdetails.map((val,index)=>{
          return <div key={index} className='playerlist'>
            <img src={val.player_image} alt="i"/>
            {val.playername}
            {val.Minimum_bid}
            {val.Bit_Increase_by}
            {val.skills}
            {val.players_owned_by}
            {val.sold_or_unsold}
            </div>
        })
      }
       </div>
      </div>
    </div>
  )
}

export default HistoryDetails