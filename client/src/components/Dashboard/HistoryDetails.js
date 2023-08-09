import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import "../../css/Dashboardcss/HistoryDetails.css"
import profile from "../../Image/no-profile-img.gif"
import axios from 'axios';
function HistoryDetails(props) {
  const { teamhistory } = props
  console.log("teamhistory", teamhistory);
  const email = localStorage.getItem("useremail")
  console.log(teamhistory)
  const [teamdetails, setteamdetails] = useState([]);
  const [playerdetails, setplayerdetails] = useState([])
  useEffect(() => {
    axios.get(`http://localhost:5000/api/details/historyauction/auction/${teamhistory}/${email}`)
      .then((response) => {
        setteamdetails(response.data)
      })
      .catch((err) => {
        console.error(err);
      })
    fetchallplayerdetails();
  }, []);

  const fetchallplayerdetails = () => {
    axios.get(`http://localhost:5000/api/details/players/${email}`)
      .then((response) => {
        setplayerdetails(response.data)
      })
      .catch((err) => {
        console.error(err);
      })
  }
  const fetchplayer = (val) => {
    // setplayerdetails([])
    axios.get(`http://localhost:5000/api/joins/teamjoinplayers/${val}/${email}`)
      .then((response) => {
        // if(response.data==''){
        //   setplayerdetails([]);
        // }
        setplayerdetails(response.data)
        console.log('subhi',playerdetails)
      })
      .catch((err) => {
        // setplayerdetails([])
        console.error(err);
      })
  }
  const handleplayer = (val) => {
    fetchplayer(val);
    
  }
  return (
    <div className='historydetails-container'>
      <div className='teamdetails'>
        <div className='teamview'>
          <div className='team-title'>
            Team Details
          </div>
          <div className='team-heading'>
            <div>Image</div>
            <div> Name</div>
            <div>Owner</div>
            <div>No_of_players</div>
          </div>
          {
            teamdetails.map((val, index) => {
              return (
              // <div key={index}>
                <div key={index} className='team-list-details'>
                  <div className='team-image'>
                    {val.team_image ? (
                      <img src={val.team_image} alt={`Team ${val.team_id}`} />
                    ) : (
                      <img src={profile} alt='Default' />
                    )}
                  </div>
                  <div className='team-name-details'>{val.team_name}</div>
                  <div className='team-owner-details'>{val.team_owner_name}</div>
                  <button className='team-player-count' onClick={() => { handleplayer(val.team_id) }}>{val.player_count}</button>
                </div>
              // </div>
              )
            })
          }
        </div>
        <div className='player-container'>
          players

          {
            playerdetails.map((val, index) => {
              return <div key={index} className='playerlist'>
                <img src={val.player_image} alt="i" />
                <div> {val.player_name}</div>
                <div> {val.Minimum_bid}</div>
                <div> {val.Bit_Increase_by}</div>
                <div>{val.skills}</div>
                <div> {val.team_owner_name}</div>
                <div> {val.sold_or_unsold}</div>
              </div>
            })
          }
        </div>
      </div>
    </div>
  )
}

export default HistoryDetails