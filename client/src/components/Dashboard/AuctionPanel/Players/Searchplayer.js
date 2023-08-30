 
// 
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import profile from "../../../../Image/no-profile-img.gif"
import '../Players/searchplayer.css';

function Searchplayer(props) {
  const { searchInput } = props;
  const [filteritem, setFilterItem] = useState([]);
  const email = localStorage.getItem('useremail');
  const auction_id = localStorage.getItem('AuctionId');

  const displayPlayers = () => {
    axios
      .get(`http://localhost:5000/api/searchplayers/searchplayers/${email}/${searchInput}`)
      .then((response) => {
        console.log(response.data);
        setFilterItem(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    displayPlayers();
  }, [searchInput]); 

  console.log(filteritem);
  const handleclicksold = () => {
  };
  console.log(filteritem);
  return (
    <div className='Whole-Container'>
      {filteritem.map((item) =>(
        <div className="searchContainer">
           <img 
            src={item.player_image ? item.player_image : profile}
            alt="Profile"
            className='playerdetails player-image'
          />
          <div className="playerdetails">{item.player_name}</div>
          <div className="playerdetails">{item.skills}</div>
          {item.sold_or_unsold === 'unsold' ? (
            <button className="playerdetails sold-bt" onClick={handleclicksold}>Sold</button>
          ) : (
            <div className="playerdetails">{item.sold_or_unsold}</div>
          )}
        </div>
      ))}
    </div>
  );
}

export default Searchplayer;
