import React, { useState,useEffect } from 'react'
import { Link,useNavigate } from 'react-router-dom';
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
  axios.get(`http://localhost:5000/api/topplayers/limitfive/${email}`)
  .then((response)=>{
    setTopTenPlayers(response.data)
  })
  .catch((err)=>{
    console.error("Error fetching user data:",err);
  })
  currentAuctionFun()
},[])
  const naviagte=useNavigate()
  const navigateFun=(val)=>{
    localStorage.setItem("AuctionId",val)
    naviagte('/user/dashboard/auctionpanel');
    
  }

  return (
    <div className='MYAuction'>
      <div className='MyAuctionImage'>
        <div className='image'></div>
        <div className='MyAuctionImageText'>
          <div className='name'>Lionel Messi</div> 
          <div className='bitpoints'>Bit Points: 10,00,00,000</div>
        </div>
      </div>
      <div className='MyAuctionPlayers'>
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
      <div className='MyAuctionDetails'>
        <div className='chooseauction'>
          <button onClick={()=>currentAuctionFun()} >Current Auction</button>
          <button onClick={()=>upcomingAuctionFun()} >Upcoming Auction</button>
        </div>
        <div className='showauctionContainer'>
          <div style={{fontWeight:'900'}} className='showauctionContainerheader'>
            <div>Auction_Name</div>
            <div>Auction_Date</div>
            <div>Points_Per_Team</div>
            <div>Players_Per_Teams</div>
          </div>
          {currentselectauction.map((val,index)=>{
            return(<div key={index} className='showauctionContainerheader'>
            <div className='routeToAuction'  onClick={()=>{navigateFun(val.auction_id)}} >{val.auction_name}</div>
            <div>{val.auction_date}</div>
            <div>{val.points_per_team}</div>
            <div>{val.players_per_team}</div>
          </div>)
          })}



        </div>
      </div>
    </div>
  )
}

export default MyAuction