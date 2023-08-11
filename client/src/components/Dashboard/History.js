import React from 'react'
import { Link,Outlet } from 'react-router-dom';
import { useState } from 'react';
import { useEffect } from 'react';
import "../../css/Dashboardcss/History.css"
import { useNavigate } from 'react-router-dom';
// import { userdata } from '../../../../server/backend/Controller';
import axios from 'axios';
function History(props) {
  const {setteamhistory} = props
  const email=localStorage.getItem("useremail")
  const navigate=useNavigate()
  console.log(email)
  const [user, setUser] = useState([]);
  useEffect(() => {
    // const fetchUser = async () => {
    //   try {
    //     const response = await fetch(`http://localhost:5000/api/historyauction/${email}`, {
    //       method: 'GET',
    //       headers: {
    //         'Content-Type': 'application/json',
    //       },
    //     });
    //     const userData = await response.json();
    //     console.log(userData)
    //     setUser(userData);
    //   }
    //   catch (error) {
    //     console.error(error.message);
    //   }
    // };
    axios.get(`http://localhost:5000/api/auction/historyauction/${email}`)
    .then((response)=>{
      setUser(response.data)
    })
    .catch((err) => {
      console.error("Error fetching user data history:", err);
    })
 
  }, []);
  const handleClick=(val)=>{
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
        {user.map((val, index) => {
          // const date = new Date(val.auction_date); 
          // const formattedDate = date.toISOString().split('T')[0];
          // console.log("hii",formattedDate)
          return <div key={val.auction_id} className='history-details'>
           <button className='auction-click' onClick={()=>{handleClick(val.auction_id)}}>
            {val.auction_name}</button>
            <div className='team-date'> {val.auction_date}</div>
            <div className='points-team'> {val.points_per_team} </div>
            <div className='players-team'>{val.players_per_team}</div>
            
          </div>
        })}
   
      </div>
    </div>

  )
}

export default History