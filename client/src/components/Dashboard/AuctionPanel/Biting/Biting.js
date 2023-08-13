/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState, useRef } from 'react'
import './Biting.css'
import SoldImage from '../../../../Image/soldout-removebg-preview.png'
import axios from 'axios'

function Biting({ searchinput }) {
  const email = localStorage.getItem("useremail")
  const auction_id = localStorage.getItem("AuctionId")
  const [playersView, setPlayersView] = useState([])
  const [playerBititedAmount, setPlayerBititedAmount] = useState(0)
  const [teamButtons, setTeamButtons] = useState([])
  const [soldto,setSoldto]=useState(null);
  useEffect(() => {
    axios.get(`http://localhost:5000/api/search/searchplayers/${email}/${auction_id}/${searchinput}`)
      .then((response) => {
        setPlayersView(response.data[0])
        setPlayerBititedAmount(response.data[0].minimum_bid);
        setSoldto(null);
      })
      .catch((err) => {
        console.error("Error fetching players data:", err);
      })
    // setPlayerBititedAmount(playersView.minimum_bid)
  }, [searchinput])
  console.log("summa", playerBititedAmount);
  useEffect(() => {
    axios.get(`http://localhost:5000/api/teambitingbutton/button/${email}/${auction_id}`)
      .then((response) => {
        setTeamButtons(response.data)
      })
      .catch((err) => {
        console.error(err);
      })
  }, []);
  console.log("sold to",soldto);
  const soldPlayersToTeams= async(soldPersonId,soldOrUnsold,soldPlayersAmount)=>{
     await axios.put(`http://localhost:5000/api/playeraddteam/joining/${email}/${playersView.player_id}`,{
      team_id:soldPersonId,
      sold_or_unsold: soldOrUnsold,
      sold_amount: soldPlayersAmount
    })
  }

  return (
    <div className='Biting'>
      <div className='BitingPlayerImage'>
        <div className='image'></div>
      </div>
      <div className='BitingPlayerDetails'>
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
        {/* <button>{playersView.sold_or_unsold === 'sold' ? ('unsold') : ('sold')}</button> */}
          {
            playersView.sold_or_unsold==='sold'?(
              <button>unsold</button>
            ):(
              <button onClick={()=>soldPlayersToTeams(soldto,'sold',playerBititedAmount)}>sold</button>
            )
          }

      </div>
      <div className='BitingControls'>
        <div className='minimumBitField'><input value={playerBititedAmount} type='text' readOnly></input></div>
        <h3>Teams</h3>
        <div className='displaysTeams'>
          {teamButtons.map((val, index) => {
            return (<button key={index} onClick={() => {setSoldto(val.team_id);setPlayerBititedAmount(playerBititedAmount + playersView.bit_increase_by)}}>{val.team_name}</button>)
          })}

        </div>
      </div>
    </div>
  )
}

export default Biting