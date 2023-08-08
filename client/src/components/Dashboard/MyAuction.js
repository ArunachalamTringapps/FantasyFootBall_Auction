import React, { useState } from 'react'
import '../../css/Dashboardcss/MyAuction.css'
import axios from 'axios'

function MyAuction() {
  // const chooseauction=[<CurrentAuction />,<UpcomingAuction />]
  const [selectauction,setSelectauction]=useState([]);
  const email=localStorage.getItem("useremail")
  const currentAuctionFun=()=>{
    axios.get(`http://localhost:5000/api/auction/currentauction/${email}`)
    .then((response)=>{
      setSelectauction(response.data)
    })
    .catch((err)=>{
      console.error("Error fetching user data:",err);
    })
  }
  const upcomingAuctionFun=()=>{
    axios.get(`http://localhost:5000/api/auction/upcomingauction/${email}`)
    .then((response)=>{
      setSelectauction(response.data)
    })
    .catch((err)=>{
      console.error("Error fetching user data:",err);
    })
  }

console.log(selectauction);
  return (
    <div className='MyAuction'>
      <div className='MyAuctionLeft'>
          <div className='MyAuctionLeftBox'>
              <div className='image'></div>
              <div className='MyAuctionLeftBoxText'>
                <div className='name'>Lionel Messi</div> 
                <div className='bitpoints'>Bit Points: 10,00,00,000</div>
              </div>
          </div>
          <div className='MyAuctionLeftAuctionContainer'>
              <div className='chooseauction'>
                <button onClick={()=>currentAuctionFun()} >Current Auction</button>
                <button onClick={()=>upcomingAuctionFun()} >Upcoming Auction</button>
              </div>
              <div className='showauction'>
                
              </div>
          </div>
      </div>
      <div className='MyAuctionRight'>
        <h5>Top 10 Biting Players</h5>
        <div className='playerlist'>
          
        </div>
      </div>

    </div>
  )
}

export default MyAuction