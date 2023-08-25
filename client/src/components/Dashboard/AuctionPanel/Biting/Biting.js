/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState, useRef } from 'react'
import './Biting.css'
import SoldImage from '../../../../Image/soldout-removebg-preview.png'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



function Biting({ searchinput,bidingPanelView }) {
  console.log("Bitingcomponent:",bidingPanelView);
  console.log(new Date());
  const email = localStorage.getItem("useremail")
  const auction_id = localStorage.getItem("AuctionId")
  const [playersView, setPlayersView] = useState([])
  const [playerBititedAmount, setPlayerBititedAmount] = useState(0)
  const [teamButtons, setTeamButtons] = useState([])
  const [soldTeamBalanceAmount,setSoldTeamBalanceAmount]=useState(0);
  const [soldto, setSoldto] = useState(null);
  const searchPlayersFun = () => {
    axios.get(`http://localhost:5000/api/search/searchplayers/${email}/${auction_id}/${searchinput}`)
      .then((response) => {
        setPlayersView(response.data[0])
        setPlayerBititedAmount(response.data[0].minimum_bid);
        setSoldto(null);
      })
      .catch((err) => {
        console.error("Error fetching players data:", err);
      })
  }


  useEffect(() => {
    searchPlayersFun()
  }, [searchinput])
  useEffect(() => {
    axios.get(`http://localhost:5000/api/teambitingbutton/button/${email}/${auction_id}`)
    .then((response) => {
      setTeamButtons(response.data)
    })
    .catch((err) => {
      console.error(err);
    })  },[]);
  const reduceTeamBalanceAmount=async(player_id_Params,soldPersonId)=>{
    await axios.put(`http://localhost:5000/api/teambalance/updatebalance`,{
      player_id:player_id_Params,
      team_id:soldPersonId
    })
    .catch(err=>{
      console.error(err);
    })
  }

  const addTeamBalanceAmount=async(player_id_Params)=>{
    await axios.put(`http://localhost:5000/api/unsold/addamounttoteam`,{
      player_id:player_id_Params,
    })
    .catch(err=>{
      console.error(err);
    })

  }


  const soldPlayersToTeams = async (soldPersonId, soldOrUnsold, soldPlayersAmount) => {
    if(soldOrUnsold==='unsold'){
      addTeamBalanceAmount(playersView.player_id);
    }
    await axios.put(`http://localhost:5000/api/playeraddteam/joining/${email}/${playersView.player_id}`, {
      team_id: soldPersonId,
      sold_or_unsold: soldOrUnsold,
      sold_amount: soldPlayersAmount
    })
    .then(res=>{
      if(soldOrUnsold==='sold')
      reduceTeamBalanceAmount(playersView.player_id,soldPersonId);
    })
    .catch((err)=>{
      console.error(err);
    })
    searchPlayersFun()
  }
  console.log("length",teamButtons.length);

  const teamBitingButtonFun = (val) => {
    if (playerBititedAmount < val.balance_amount) {
      setSoldto(val.team_id);
      setSoldTeamBalanceAmount(val.balance_amount)
      setPlayerBititedAmount(playerBititedAmount + playersView.bit_increase_by)
    }
    else{
      toast.error("Insufficient Balance")
    }
  }

  return (
    <div className='Biting'>
      {
        // bidingPanelView.current && 
        ( teamButtons.length>=4)?(<><div className='BitingPlayerImage'>
          <div className='image'></div>
        </div><div className='BitingPlayerDetails'>
            <div><label>Name</label><h5>{playersView.player_name}</h5></div>
            <div><label>Age</label><h5>{playersView.age}</h5></div>
            <div><label>Skills</label><h5>
              {Array.isArray(playersView.skills) ? (
                playersView.skills.map((skill, index) => (
                  <span key={index}>{skill}{index !== playersView.skills.length - 1 ? ', ' : ''}</span>
                ))
              ) : (
                <span>No skills available</span>
              )}
            </h5></div>
            <div><label>Minimum Bit</label><h5>{playersView.minimum_bid}</h5></div>
            <div><label>Bit Increase By</label><h5>{playersView.bit_increase_by}</h5></div>
            <div><label>Sold Or Unsold</label><h5>{playersView.sold_or_unsold}</h5></div>
            <div><label>Sold Amount</label><h5>{playersView.sold_amount}</h5></div>
            {playersView.sold_or_unsold === 'sold' ? (
              <div style={{ backgroundImage: `url(${SoldImage})` }} className='soldorunsold'></div>

            ) : (
              <div style={{ backgroundImage: `none` }} className='soldorunsold'></div>

            )}
            {playersView.sold_or_unsold === 'sold' ? (
              <button onClick={() => soldPlayersToTeams(null, 'unsold', 0)}>unsold</button>
            ) : (
              <button onClick={() => { soldto !== null ? (soldPlayersToTeams(soldto, 'sold', playerBititedAmount)) : (toast.error("Team is not selected to sold the player")); } }>sold</button>
            )}

          </div><div className='BitingControls'>
            <div className='minimumBitField'><input value={playerBititedAmount} type='text' readOnly></input></div>
            <h3>Teams</h3>
            <div className='displaysTeams'>
              {teamButtons.map((val, index) => {
                return (<button key={index} onClick={() => { teamBitingButtonFun(val); } }>{val.team_name}</button>);
              })}

            </div>
          </div></>):(<div className='BidingWarning'><div className='BidingWarningText'>
            Biding start on Current Date and Need Minimum Four Teams to Start the Biding</div></div>)
          
        


      }
      <ToastContainer limit={1} position={'top-right'} pauseOnHover={false} pauseOnFocusLoss={false} draggable={false} closeOnClick={false} />
    </div>
  )
}

export default Biting