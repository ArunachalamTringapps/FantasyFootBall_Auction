import React, { useEffect, useState } from 'react'
import axios from 'axios'
import "../Players/Player.css"
import profile from "../../../../Image/no-profile-img.gif"
import { useNavigate } from 'react-router-dom'
// function Players({ playersTeamsEdit }) {
// import SearchPlayer from './Searchplayer';
//   console.log(playersTeamsEdit);
//   return (
//     <div>players</div>
//   )
// }
function Players({searchInput,setplayerName,setplayerage,setplayerskills}) { 

  // console.log(setplayername);
  // console.log(setplayerage);
  const [playerlistdetails, setplayerlistdetails] = useState([])
  const email = localStorage.getItem("useremail")
  const auction_id = localStorage.getItem("AuctionId")
  const navigate=useNavigate()
const displayPlayers = () =>{
    axios.get(`http://localhost:5000/api/playerslist/playersview/${auction_id}/${email}`)
      .then((response) => {
        setplayerlistdetails(response.data)
        console.log(playerlistdetails)
      })
      .catch((err) => {
        console.error(err);
      })
    }
  useEffect(() => {
        displayPlayers()
      }, [])
    const handleclickgoplayer = () => {
      navigate('/user/dashboard/createplayers')
    }
    const handleeditplayer = (val) => {
     console.log(val.player_name);
     setplayerName(val.player_name);
     setplayerage(val.age);
     setplayerskills(val.skills);
     navigate('/user/dashboard/playersedit')
    }
    const handledeleteplayer = () =>{}
  return (
    // <div>players</div>
    <div className='playerlist-container-list'>
    <div className='playerlist-whole'>
      <div className='playerlist-title'>
        <div>PlayersList Details</div>
        <div><button onClick={() => { handleclickgoplayer() }}>Create Player</button></div>
      </div>
      <div className='filter-buttons'>
      <button>Sold</button>
      <button>UnSold</button>
      <button>Skills</button>
      </div>
      <div className='playerlist-view'>
        {
          playerlistdetails.map((val, index) => {
            return (
              <div key={index} className='player-listview-details'>
                <div className='player-auction-image'>
                  {val.player_image ? (
                    <img src={`http://localhost:5000/uploads/${val.player_image}`} alt={`player ${val.player_id}`} />
                  ) : (
                    <img src={profile} alt='Default' />
                  )}
                </div>
                <div className='player-name-details'><label className='playerlabel'>Username</label>
        <span className='dot'>:</span>
        <span className='playerDetails'>{val.player_name}</span></div>
                <div className='player-name-details'><label className='playerlabel'>Age</label>
        <span className='dot'>:</span>
        <span className='playerDetails'>{val.age}</span></div>
                <div className='player-name-details'><label className='playerlabel'>Skills</label>
        <span className='dot'>:</span>
        <span className='playerDetails'>{val.skills}</span></div>
                <div className='player-name-details'><label className='playerlabel'>MiminumBid</label>
        <span className='dot'>:</span>
        <span className='playerDetails'>{val.minimum_bid}</span></div>
                <div className='player-name-details'><label className='playerlabel'>BitIncreaseby</label>
        <span className='dot'>:</span>
        <span className='playerDetails'>{val.bit_increase_by}</span></div>
                <div className='player-name-details'><label className='playerlabel'>Soldorunsold</label>
        <span className='dot'>:</span>
        <span className='playerDetails'>{val.sold_or_unsold}</span></div>
                <div className='player-name-details'><label className='playerlabel'>sold_amount</label>
        <span className='dot'>:</span>
        <span className='playerDetails'>{val.sold_amount}</span></div>
                <div className='player-edit-delete'>
                  <button className='player-edit' onClick={() => { handleeditplayer(val) }}>Edit</button>
                  <button className='player-delete' onClick={() => { handledeleteplayer() }}>Delete</button>
                </div>
              </div>
            )
          })
        }
      </div>

    {/* <ToastContainer limit={1} position={'top-right'} pauseOnHover={false} pauseOnFocusLoss={false} draggable={false} closeOnClick={false} /> */}
    {/* <SearchPlayer searchInput={searchInput}/> */}
    </div>
  </div>
  )
}

export default Players