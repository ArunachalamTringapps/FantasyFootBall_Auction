/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
import '../../../css/Dashboardcss/AuctionPanelcss/Biting.css'
import axios from 'axios'

function Biting({ searchinput }) {
  const email = localStorage.getItem("useremail")
  const [playersView, setPlayersView] = useState([])
  useEffect(() => {
    axios.get(`http://localhost:5000/api/search/searchplayers/${email}/${searchinput}`)
      .then((response) => {
        setPlayersView(response.data)
      })
      .catch((err) => {
        console.error("Error fetching players data:", err);
      })
  }, [searchinput])
  console.log(playersView);
  return (
    <div className='Biting'>
      <div className='BitingPlayerImage'>
        <div className='image'></div>
      </div>
      <div className='BitingPlayerDetails'>
        <div><label>Name</label><h5>Anwar Ali</h5></div>
        <div><label>Age</label><h5>25</h5></div>
        <div><label>Skills</label><h5>defender</h5></div>
        <div><label>Minimum Bit</label><h5>2000</h5></div>
        <div><label>Bit Increase By</label><h5>1000</h5></div>
        <div><label>Sold Or Unsold</label><h5>Sold</h5></div>
        <div><label>Sold Amount</label><h5>8000</h5></div>
        <div className='soldorunsold'></div>



      </div>
      <div className='BitingControls'></div>
    </div>
  )
}

export default Biting