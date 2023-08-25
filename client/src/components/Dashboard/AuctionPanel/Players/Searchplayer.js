 
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import profile from "../../../../Image/no-profile-img.gif"
import '../Players/searchplayer.css';

function Searchplayer({ searchInput }) {
  const [playerdetails, setPlayerdetails] = useState([]); 
  const [filteritem, setFilterItem] = useState(null); 
  const email = localStorage.getItem('useremail');
  const auction_id = localStorage.getItem('AuctionId');

  const displayPlayers = () => {
    axios
      .get(`http://localhost:5000/api/playerslist/playersview/${auction_id}/${email}`)
      .then((response) => {
        setPlayerdetails(response.data);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  useEffect(() => {
    displayPlayers();
  }, []);
  const handleclicksold =  () =>{

  }

  useEffect(() => {
    const filteredItem = playerdetails.find((item) => item.player_name.toLowerCase() === searchInput.toLowerCase());
    if (filteredItem) {
      setFilterItem(filteredItem);
    } else {
      setFilterItem(null);
    }
  }, [searchInput, playerdetails]);

  return (
    <>
      {filteritem ? (
        <div className="searchContainer">
          <div className='playerdetailsimage'>
                  {filteritem.player_image ? (
                    <img src={`http://localhost:5000/uploads/${filteritem.player_image}`} alt={`player ${filteritem.player_id}`} />
                  ) : (
                    <img src={profile} alt='Default' />
                  )}
                </div>
          <div className="playerdetails">Name: {filteritem.player_name}</div>
          <div className="playerdetails">Age: {filteritem.age}</div>
          <div className="playerdetails">Skills: {filteritem.skills}</div>
          {filteritem.sold_or_unsold=='unsold' ?<button className="playerdetails sold-bt" onclick={handleclicksold()}>Sold</button>:<div className="playerdetails">sold_or_unsold: {filteritem.sold_or_unsold}</div>}
          {/* <div className="playerdetails">sold_or_unsold: {filteritem.sold_or_unsold}</div> */}
        </div>
      ) : (
        ""
      )}
    </>
  );
}

export default Searchplayer;



