import React, { useEffect, useState } from 'react'
import '../../../css/Dashboardcss/AuctionPanelcss/Biting.css'
import axios from 'axios'

function Biting({searchinput}){
  const email=localStorage.getItem("useremail")
  const [playersView,setPlayersView]=useState([])
  useEffect(()=>{
    axios.get(`http://localhost:5000/api/search/searchplayers/${email}/${searchinput}`)
    .then((response)=>{
        setPlayersView(response.data)
    })
    .catch((err)=>{
      console.error("Error fetching players data:",err);
    })
  },[searchinput])
  console.log(playersView);
  return (
    <div className='Biting'>
      <div className='BitingPlayerImage'>
        <div className='image'></div>
      </div>
      <div className='BitingPlayerDetails'>
        <div><label>Name:</label><h5>Anwar Ali</h5></div>
        
      </div>
      <div className='BitingControls'>fghgj</div>
    </div>
  )
}

export default Biting