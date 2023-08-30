import React, { useEffect, useState } from 'react'
import './AuctionHome.css'
import { BiBitcoin } from "react-icons/bi";
import { GiThreeFriends } from "react-icons/gi";
import { LiaUserPlusSolid } from "react-icons/lia";
import Biting from './Biting/Biting'
import Players from './Players/Players'
import Teams from './Teams/Teams'
import { useQuery, gql } from '@apollo/client';


const GET_DETAILS_QUERY=gql`
query findAuctionById($auctionId: String!){
  findAuctionById(auction_id:$auctionId){
    auction_name  
  }
}
`;

function AuctionHome({playersTeamsEdit,bidingPanelView,setteamsedit,setdefaultteamname,setdefaultteamownername,setdefaultteamowneremail,setplayerName,setplayerage,setplayerskills,setdefaultImage}) {
  const auctionId=localStorage.getItem('AuctionId')
  const [searchInput, setSearchInput] = useState('');
  const auctionSwitchComponent = [
    {
      index: 0,
      title: "Biting",
      icons: <BiBitcoin className='AuctionHomeMenuLogo' />
    },
    {
      index: 1,
      title: "Teams",
      icons: <GiThreeFriends className='AuctionHomeMenuLogo' />
    },
    {
      index: 2,
      title: "Players",
      icons: <LiaUserPlusSolid className='AuctionHomeMenuLogo' />
    }
  ]
  const switchingpanel = [<Biting  searchinput={searchInput} bidingPanelView={bidingPanelView} />, <Teams playersTeamsEdit={playersTeamsEdit} setteamsedit={setteamsedit} setdefaultteamname={setdefaultteamname}   setdefaultteamownername={setdefaultteamownername} setdefaultteamowneremail={setdefaultteamowneremail}
  setdefaultImage={setdefaultImage}/>, <Players searchInput={searchInput} playersTeamsEdit={playersTeamsEdit} setplayerName={setplayerName} setplayerage={setplayerage} setplayerskills={setplayerskills} />]
  const [colorMenu, setColorMenu] = useState(0);
  const [switchpanelcount, setSwitchpanlecount] = useState(0);
  const [auctionName,setAuctionName]=useState('');
  const {loading,error,data}=useQuery(GET_DETAILS_QUERY,{
    variables:{auctionId:auctionId}
  });

  useEffect(()=>{
    if(loading){return;}
    if(error){
      console.error('Error fetching data:', error);
    }
    else{
      setAuctionName(data.findAuctionById)
    }
  },[loading, error, data])
  return (
    <div className='AuctionHome'>
      <div className='AuctionHeader'>
        <div className='AuctionHeaderHeading'><h6>{auctionName.auction_name}</h6></div>
        <div className='AuctionHeaderSearch'><input onChange={(e) => setSearchInput(e.target.value)} placeholder=' Search Players ...' type='text'></input></div>
      </div>
      {/* <Searchplayer searchInput={searchInput}/> */}
      <div className='Auctionmenu'>
        {auctionSwitchComponent.map((val, index) => {
          return (<div className={colorMenu === val.index ? 'menuItemTrue' : 'menuItemFalse'} onClick={(e) => { setSwitchpanlecount(val.index); setColorMenu(val.index) }} key={index}>{val.icons}{val.title}</div>)
        })}
      </div>
      <div className='AuctionContainer'>
        {switchingpanel[switchpanelcount]}
      </div>
    </div>
  )
}

export default AuctionHome