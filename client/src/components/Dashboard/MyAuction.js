import React, { useState,useEffect } from 'react'
import '../../css/Dashboardcss/MyAuction.css'
import axios from 'axios'

function MyAuction() {
  // const chooseauction=[<CurrentAuction />,<UpcomingAuction />]
  const [currentselectauction,setCurrentSelectauction]=useState([]);
  const [topTenPlayers,setTopTenPlayers]=useState([])
  const email=localStorage.getItem("useremail")
  const currentAuctionFun=()=>{
    axios.get(`http://localhost:5000/api/auction/currentauction/${email}`)
    .then((response)=>{
      setCurrentSelectauction(response.data)
    })
    .catch((err)=>{
      console.error("Error fetching user data:",err);
    })
  }
  const upcomingAuctionFun=()=>{
    axios.get(`http://localhost:5000/api/auction/upcomingauction/${email}`)
    .then((response)=>{
      setCurrentSelectauction(response.data)
    })
    .catch((error)=>{
      console.log("Error fetching user data:",error.code);
    })
  }

console.log("auctionclicking",currentselectauction);

useEffect(()=>{
  axios.get(`http://localhost:5000/api/details/players/${email}`)
  .then((response)=>{
    setTopTenPlayers(response.data)
  })
  .catch((err)=>{
    console.error("Error fetching user data:",err);
  })
  currentAuctionFun()
},[])

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
              <div className='showauctionContainer'>
                {currentselectauction.map((val,index)=>{return(
                  <div key={index} className='showauctionitems'>
                    <h5>{val.auction_date}</h5>
                    <h5>{val.auction_name}</h5>
                    <h5>{val.players_per_team}</h5>
                    <h5>{val.points_per_team}</h5>
                  </div>
                )})}



              </div>
          </div>
      </div>
      <div className='MyAuctionRight'>
        <h5>Top 5 Biting Players</h5>
        <div className='playerlist'>
          {topTenPlayers.map((val,index)=>{
            return(
              <div key={index} className='playersitemscontainer'>
                <div className='image' style={{backgroundImage:`${val.player_image}`}} ></div>
                <div className='name'>{val.player_name}</div>
                <div className='points'>{val.minimum_bid}</div>

              </div>
            )

          })}
        </div>
      </div>

    </div>
  )
}

export default MyAuction