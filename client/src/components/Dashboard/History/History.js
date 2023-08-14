import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import "./History.css"
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
function History(props) {
  const { setteamhistory } = props
  const email = localStorage.getItem("useremail")
  const navigate = useNavigate()
  console.log(email)
  const [user, setUser] = useState([]);
  useEffect(() => {
    axios.get(`http://localhost:5000/api/auction/historyauction/${email}`)
      .then((response) => {
        setUser(response.data)
      })
      .catch((err) => {
        console.error("Error fetching user data history:", err);
      })

  }, []);
  const handleClick = (val) => {
    console.log("5");
    setteamhistory(val)
    navigate('/user/dashboard/auctiondetails')
  }

  return (
    <div className='history-container'>
      <h1>Auction Details</h1>
      <div className='details'>
        <div className='heading-details'>
          <h4>Auction_name Auction_date Points_per_team Players_per_team</h4>
        </div>
        <div className='history-auction'>
          {user.map((val, index) => {
            return <div key={val.auction_id} className='history-details'>
              <button className='auction-click' onClick={() => { handleClick(val.auction_id) }}>
                {val.auction_name}</button>
              <div className='team-date'> {val.auction_date}</div>
              <div className='points-team'> {val.points_per_team} </div>
              <div className='players-team'>{val.players_per_team}</div>

            </div>
          })}
        </div>
      </div>
    </div>

  )
}

export default History