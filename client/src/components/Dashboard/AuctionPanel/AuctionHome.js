import React, { useState } from 'react'
import '../../../css/Dashboardcss/AuctionPanelcss/AuctionHome.css'
import {Link, Route,Routes} from 'react-router-dom'
import Biting from './Biting'
import Players from './Players'
import Teams from './Teams'

function AuctionHome() {
  const auctionSwitchComponent=[
    {
      index:0,
      title:"Biting",
      path:""
    },
    {
      index:1,
      title:"Teams",
      path:"auctionteams"
    },
    {
      index:2,
      title:"Players",
      path:"auctionplayers"
    }
  ]
  const switchingpanel=[<Biting />,<Teams />,<Players />]
  const [switchpanelcount,setSwitchpanlecount]=useState(0);
  const auction_id=localStorage.getItem("AuctionId")
  return (
    <div className='AuctionHome'>
      <div className='AuctionHeader'>
        <div className='AuctionHeaderHeading'><h6>Auction Name</h6></div>
        <div className='AuctionHeaderSearch'><input placeholder=' Search ...' type='text'></input></div>

      </div>
      <div className='Auctionmenu'>
        {auctionSwitchComponent.map((val,index)=>{
          return (<div className='menuItem' onClick={(e)=>{setSwitchpanlecount(val.index)}} key={index}>{val.title}</div>)
        })}
      </div>
      <div className='AuctionContainer'> 
        {switchingpanel[switchpanelcount]}
        {/* <Routes>
          <Route to='/' element={<Biting />}></Route>
          <Route to='/auctionteams' element={<Teams />}></Route>
          <Route to='/auctionplayers' element={<Players />}></Route>
        </Routes>  */}
      </div>  
    </div>
  )
}

export default AuctionHome