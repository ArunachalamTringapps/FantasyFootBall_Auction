 
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
      .get(`http://localhost:5000/api/searchplayers/searchplayers/${email}/${auction_id}/${searchInput}`)
      .then((response) => {
        console.log(response.data[0]);
        setFilterItem(response.data[0]);
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
    <>
      {filteritem.length!=0 ? (
        <div className="searchContainer">
          <div className="playerdetails">{filteritem.player_name}</div>
          <div className="playerdetails">{filteritem.skills}</div>
          {filteritem.sold_or_unsold === 'unsold' ? (
            <button className="playerdetails sold-bt" onClick={handleclicksold}>Sold</button>
          ) : (
            <div className="playerdetails">{filteritem.sold_or_unsold}</div>
          )}
        </div>
      ) : (
        ""
      )}
    </>
  );
}

export default Searchplayer;
