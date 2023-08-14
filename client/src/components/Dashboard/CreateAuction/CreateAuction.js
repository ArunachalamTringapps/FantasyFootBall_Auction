import React, { useState } from 'react'
import './CreateAuction.css'
import axios from "axios"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function CreateAuction() {
  const [auction_name, setAuctionName] = useState('');
  const [auction_date, setAuctionDate] = useState('');
  const [points_per_team, setpointsperteam] = useState('');
  const [players_per_team, setPlayersperteam] = useState(11);
  const handleCreateauction = async (e) => {
    e.preventDefault();
    const email_id = localStorage.getItem("useremail")
    const currentDate = new Date();
    const inputDate = new Date(auction_date);
    console.log("now date", currentDate.toISOString().split('T')[0]);
    console.log("input date", inputDate);
    if (!auction_name) {
      toast.error("Auction Name is required");
      return
    }
    if (!auction_date) {
      toast.error("Auction Date is required");
      return
    }
    if (inputDate.toISOString().split('T')[0] < currentDate.toISOString().split('T')[0]) {
      toast.error("Auction Date should be current or upcoming date");
      return
    }
    if (!points_per_team) {
      toast.error("Points Per Team is required");
      return
    }
    if (!players_per_team) {
      toast.error("Players Per Team is required");
      return
    }
    if (players_per_team > 11) {
      toast.error("Players Per Team should be less than 12");
      return
    }
    axios.post('http://localhost:5000/api/createauction', { auction_name, auction_date, points_per_team, players_per_team, email_id })
      .then((auctionData) => {
        console.log(auctionData);
        toast.success('Auction Created')
      })
      .catch((err) => {
        console.error('Error:', err);
        toast.error('An error occurred during registration.');
      })
    e.target.reset();
  }


  return (
    <div className='createAuction'>
      <form className='form_createAuction' onSubmit={handleCreateauction} autoComplete='off'>
        <h2>Create Auction</h2>
        <div className='inputbox'>
          <label className='label'>AUCTION NAME</label>
          <input type="text" name="Auction Name" placeholder='Auction Name' className='fields' onChange={(e) => setAuctionName(e.target.value)} ></input>

        </div>
        <div className='inputbox'>
          <label className='label'>AUCTION DATE</label>
          <input type="date" name="Auction Date" className='fields' onChange={(e) => setAuctionDate(e.target.value)}></input>
        </div>
        <div className='inputbox'>
          <label className='label'>POINTS PER TEAM</label>
          <input type="text" name="Points Per Team" placeholder='Points Per Team' className='fields' onChange={(e) => setpointsperteam(e.target.value)}></input>
        </div>
        <div className='inputbox'>
          <label className='label'>PLAYERS PER TEAM</label>
          <input type="text" name="Players Per Team" defaultValue={players_per_team} placeholder='Players Per Team' className='fields' onChange={(e) => setPlayersperteam(e.target.value)}></input>
        </div>
        <button className='bt'>Submit</button>
      </form>
      {/* <ToastContainer limit={1} position={'top-right'} pauseOnHover={false} pauseOnFocusLoss={false} draggable={false} closeOnClick={false} /> */}
    </div>
  )
}

export default CreateAuction;