import React,{useState} from 'react'
import '../../css/Dashboardcss/CreateAuction.css'
function CreateAuction() {
  const [AuctionName,setAuctionName]=useState('');
  const[AuctionDate,setAuctionDate]=useState('');
  const[Pointsperteam,setpointsperteam]=useState('');
  const[Playersperteam,setPlayersperteam]=useState('');
  return (
    <div className='createAuction'>
        <form className='form_createAuction'>
        <h2>Create Auction</h2>
        <div className='inputbox'>
          <label className='label'>AUCTION NAME</label>
          <input type="text" name="Auction Name" placeholder='Auction Name'className='fields' onChange={(e) => setAuctionName(e.target.value)} ></input>

        </div>
        <div className='inputbox'>
          <label className='label'>AUCTION DATE</label>
          <input type="date" name="Auction Date" className='fields' onChange={(e) => setAuctionDate(e.target.value)}></input>
        </div>
        <div className='inputbox'>
          <label className='label'>POINTS PER TEAM</label>
          <input type="text" name="Points Per Team" placeholder='Points Per Team'className='fields' onChange={(e) => setpointsperteam(e.target.value)}></input>
        </div>
        <div className='inputbox'>
          <label className='label'>PLAYERS PER TEAM</label>
            <input type="text" name="Players Per Team" placeholder='Players Per Team' className='fields' onChange={(e) => setPlayersperteam(e.target.value)}></input>
        </div>
        <button className='bt'>Add Auction</button>
        </form> 
    </div>
  )
}

export default CreateAuction;