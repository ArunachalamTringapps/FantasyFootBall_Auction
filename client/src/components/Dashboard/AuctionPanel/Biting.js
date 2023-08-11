import React, { useEffect, useState } from 'react'
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
      Biting
    </div>
  )
}

export default Biting