import React, { useState } from 'react'
import '../../../css/Dashboardcss/AuctionPanelcss/AuctionHome.css'
import {Link, Route,Routes} from 'react-router-dom'
import { BiBitcoin } from "react-icons/bi";
import { GiThreeFriends } from "react-icons/gi";
import { LiaUserPlusSolid } from "react-icons/lia";
import Biting from './Biting'
import Players from './Players'
import Teams from './Teams'

function AuctionHome({playersTeamsEdit}) {
  const [searchInput,setSearchInput]=useState('a');
  const auctionSwitchComponent=[
    {
      index:0,
      title:"Biting",
      path:"",
      icons:<BiBitcoin/>
    },
    {
      index:1,
      title:"Teams",
      path:"auctionteams",
      icons: <GiThreeFriends  />
    },
    {
      index:2,
      title:"Players",
      path:"auctionplayers",
      icons:<LiaUserPlusSolid  />
    }
  ]
  const switchingpanel=[<Biting searchinput={searchInput} />,<Teams playersTeamsEdit={playersTeamsEdit} />,<Players playersTeamsEdit={playersTeamsEdit} />]
  const [colorMenu,setColorMenu]=useState(0);
  const [switchpanelcount,setSwitchpanlecount]=useState(0);
  const auction_id=localStorage.getItem("AuctionId")
  return (
    <div className='AuctionHome'>
      <div className='AuctionHeader'>
        <div className='AuctionHeaderHeading'><h6>Auction Name</h6></div>
        <div className='AuctionHeaderSearch'><input onChange={(e)=>setSearchInput(e.target.value)} placeholder=' Search Players ...' type='text'></input></div>

      </div>
      <div className='Auctionmenu'>
        {auctionSwitchComponent.map((val,index)=>{
          return (<div className={colorMenu===val.index?'menuItemTrue':'menuItemFalse'} onClick={(e)=>{setSwitchpanlecount(val.index);setColorMenu(val.index)}} key={index}>{val.icons}{val.title}</div>)
        })}
      </div>
      <div className='AuctionContainer'> 
        {switchingpanel[switchpanelcount]}
      </div>  
    </div>
  )
}

export default AuctionHome