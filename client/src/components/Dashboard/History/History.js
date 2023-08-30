import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import "./History.css"
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useQuery,gql } from '@apollo/client';

const HISTORY_AUCTION_DETAILS=gql`
query getdetails($email: String!){
  HistoryAuction(email_id: { user_email_id: $email }) {
    auction_id
    auction_name
    auction_date
    points_per_team
    players_per_team
  }
}`
function History(props) {
  const { setteamhistory } = props
  const email = localStorage.getItem("useremail")
  const navigate = useNavigate()
  console.log(email)
  const [user, setUser] = useState([]);
  // const[History]=useQuery(HISTORY_AUCTION_DETAILS)
  const {loading,error,data}=useQuery(HISTORY_AUCTION_DETAILS,{
    variables:{email}
  });
  if(loading){
    return ;
  }
  if(error){
    console.log(error)
  }
  const userhistory = data?.HistoryAuction || [];
  console.log("subhi",userhistory.user_email_id)
  // useEffect(() => {
    // axios.get(`http://localhost:5000/api/auction/historyauction/${email}`)
    //   .then((response) => {
    //     setUser(response.data)
    //   })
    //   .catch((err) => {
    //     console.error("Error fetching user data history:", err);
    //   })

  // }, []);
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
            <div>Auction_name</div>
            <div>Auction_date</div>
            <div>Points_per_team</div>
            <div>Players_per_team</div>
        </div>
        {
          userhistory.map((val,index)=>{
            return(
              <div key={val.auction_id}  className='heading-details centerAlignHeadingDetails '>
              <div><button className='auction-click' onClick={() => { handleClick(val.auction_id) }}>
                {val.auction_name}</button></div>
              <div className='team-date'> {val.auction_date}</div>
              <div className='points-team'> {val.points_per_team} </div>
              <div className='players-team'>{val.players_per_team}</div>
              </div>
            )
          })
        }
        {/* <div className='history-auction'>
          {user.map((val, index) => {
            return <div key={val.auction_id} className='history-details'>
              <div><button className='auction-click' onClick={() => { handleClick(val.auction_id) }}>
                {val.auction_name}</button></div>
              <div className='team-date'> {val.auction_date}</div>
              <div className='points-team'> {val.points_per_team} </div>
              <div className='players-team'>{val.players_per_team}</div>

            </div>
          })}
        </div> */}
      </div>
    </div>

  )
}

export default History