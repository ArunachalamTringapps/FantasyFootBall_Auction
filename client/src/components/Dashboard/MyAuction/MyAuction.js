/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import './MyAuction.css'
import { useQuery,gql } from '@apollo/client';

const GET_DETAILS=gql`
query getdetails($email: String!){
  currentAuction(email_id: { user_email_id: $email }) {
    auction_id
    auction_name
    auction_date
    points_per_team
    players_per_team
  }
  UpComingAuction(email_id: { user_email_id: $email }) {
    auction_id
    auction_name
    auction_date
    points_per_team
    players_per_team
  }
  topFivePlayers(user_email_id:{email_id:$email}){
    player_id
    player_image
    player_name
    minimum_bid
  }
}
`;


function MyAuction({setplayersTeamsEdit,bidingPanelView }) {

  const [currentShowingAuction,setCurrentShowingAuction]=useState(true);
  const [currentselectauction, setCurrentSelectauction] = useState([]);
  const [topTenPlayers, setTopTenPlayers] = useState([])
  const email = localStorage.getItem("useremail")

  const {loading,error,data}=useQuery(GET_DETAILS,{
    variables:{email}
  });
  
useEffect(() => {
  if (loading) { return; }
  if (error) {
    console.error('Error fetching data:', error);
  } else {
    if (currentShowingAuction) {
      setCurrentSelectauction(data.currentAuction);
    } else {
      setCurrentSelectauction(data.UpComingAuction);
    }
    setTopTenPlayers(data.topFivePlayers)
  }
}, [loading, error, data, currentShowingAuction]);

  const CurrentAuctionFun = async () => {
    setplayersTeamsEdit(false);
    setCurrentShowingAuction(true);
  }
  const upcomingAuctionFun = () => {
    setplayersTeamsEdit(true);
    setCurrentShowingAuction(false);
  }
  const naviagte = useNavigate()
  const navigateFun = (val) => {
    localStorage.setItem("AuctionId", val)
    naviagte('/user/dashboard/auctionpanel');

  }
  useEffect(()=>{
    if(currentselectauction.auction_date===new Date())
    bidingPanelView.current=true;
    else
    bidingPanelView.current=false;
  },[setCurrentSelectauction])

console.log("currentselectauction",currentselectauction);
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
          {topTenPlayers.map((val, index) => {
            return (
              <div key={index} className='playersitemscontainer'>
                <div className='image' style={{ backgroundImage: `${val.player_image}` }} ></div>
                <div className='name'>{val.player_name}</div>
                <div className='points'>{val.minimum_bid}</div>

              </div>
            )

          })}
        </div>
      </div>
      <div className='MyAuctionDetails'>
        <div className='chooseauction'>
          <button onClick={() => CurrentAuctionFun()} >Current Auction</button>
          <button onClick={() => upcomingAuctionFun()} >Upcoming Auction</button>
        </div>
        <div className='showauctionContainer'>
          <div style={{ fontWeight: '900' }} className='showauctionContainerheader'>
            <div>Auction_Name</div>
            <div>Auction_Date</div>
            <div>Points_Per_Team</div>
            <div>Players_Per_Teams</div>
          </div>
          {
          currentselectauction===null?(<div className='showauctionContainerNoAuction'>{currentShowingAuction?'No Today Auction':'No UpComingAuction'}</div>):(
          
          
          currentselectauction.map((val, index) => {
            return (<div key={index} className='showauctionContainerheader'>
              <div className='routeToAuction' onClick={() => {navigateFun(val.auction_id) }} >{val.auction_name}</div>
              <div>{val.auction_date}</div>
              <div>{val.points_per_team}</div>
              <div>{val.players_per_team}</div>
            </div>)
          })
          
          )
          }



        </div>
      </div>
    </div>
  )
}

export default MyAuction