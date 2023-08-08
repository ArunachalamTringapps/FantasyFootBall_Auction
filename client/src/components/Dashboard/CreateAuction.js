import React,{useState} from 'react'
import '../../css/Dashboardcss/CreateAuction.css'
function CreateAuction() {
  return (
    <div className='createAuction'>
        <form className='form_createAuction'>
        <div className='inputbox'>
          <label>AUCTION NAME</label>
          <input type="text" name="Auction Name" placeholder='Auction Name'className='fields' ></input>

        </div>
        <div className='inputbox'>
          <label>AUCTION DATE</label>
          <input type="date" name="Auction Date" className='fields' ></input>
        </div>
        <div className='inputbox'>
          <label>POINTS PER TEAM</label>
          <input type="text" name="Points Per Team" placeholder='Points Per Team'className='fields' ></input>
        </div>
        <div className='inputbox'>
          <label>PLAYERS PER TEAM</label>
            <input type="text" name="Players Per Team" placeholder='Players Per Team' className='fields' ></input>
        </div>
        <div className='inputbox'>
          <label>EMAIL</label>
            <input type="email" name="Email" placeholder='Email' className='fields'></input>
        </div>
        </form>
      <button className='bt'>Add Auction</button>
    </div>
  )
}

export default CreateAuction;