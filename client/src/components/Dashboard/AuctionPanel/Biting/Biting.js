/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState, useRef } from 'react'
import './Biting.css'
import SoldImage from '../../../../Image/soldout-removebg-preview.png'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useQuery, gql } from '@apollo/client';
import { useMutation } from "@apollo/client";



const GET_TEAM_QUERY = gql`
query findAuctionById($auction_id: String!){
  findAuctionById(auction_id:$auction_id){
    team{
      team_name
      balance_amount
      team_id
    }
  }
}
`;
const GET_SEARCH_QUERY = gql`
  query SearchPlayers($playerName: String!, $emailId: String!, $auctionId: String!) {
    searchplayer(searchPlayer: {
      player_name: $playerName
      email_id: $emailId
      auction_id: $auctionId
    }) {
      player_name
      player_image
      player_id
      minimum_bid
      bit_increase_by
      age
      skills
      sold_amount
      sold_or_unsold
    }
  }
`;
const SOLD_PLAYERS_MUTATION = gql`
  mutation SoldPlayers($player_id: String!,$team_id: String,$sold_or_unsold: String!,$sold_amount: Int!) {
    soldPlayers(soldorUnsoldInput:{
      player_id:$player_id
      team_id:$team_id
      sold_or_unsold:$sold_or_unsold
      sold_amount:$sold_amount
    })
  }
`;

const UNSOLD_PLAYERS_MUTATION = gql`
  mutation UnsoldPlayers($player_id: String!){
  unSoldPlayers(soldorUnsold : {
    player_id:$player_id
  })
}
`;


function Biting({ searchinput, bidingPanelView }) {
  // console.log("Bitingcomponent:", searchinput);
  // console.log(new Date());
  const [soldPlayersMutation, { soldloading, solderror }] = useMutation(SOLD_PLAYERS_MUTATION);
  const [unsoldPlayersMutation, { unsoldloading, unsolderror }] = useMutation(UNSOLD_PLAYERS_MUTATION);

  const email = localStorage.getItem("useremail")
  const auction_id = localStorage.getItem("AuctionId")
  const [playersView, setPlayersView] = useState([])
  const [playerBititedAmount, setPlayerBititedAmount] = useState(0)
  const [teamButtons, setTeamButtons] = useState([])
  // const [soldTeamBalanceAmount,setSoldTeamBalanceAmount]=useState(0);
  const [soldto, setSoldto] = useState(null);
  const { loading: loadingTeamButton, error: errorTeamButton, data: dataTeamButton, refetch: refetchTeamButton } = useQuery(GET_TEAM_QUERY, {
    variables: {
      auction_id: auction_id
    }
  })

  const { loading: loadingSearchPlayer, error: errorSearchPlayer, data: dataSearchPlayer, refetch: refetchSearchPlayer } = useQuery(GET_SEARCH_QUERY, {
    variables: {
      playerName: searchinput,
      emailId: email,
      auctionId: auction_id
    }
  })

  useEffect(() => {
    if (loadingTeamButton || loadingSearchPlayer) { return; }
    if (errorTeamButton || errorSearchPlayer) {
      console.error('Error fetching data:', errorTeamButton, errorSearchPlayer);
    }
    else {
      if (dataTeamButton) {
        setTeamButtons(dataTeamButton.findAuctionById.team)
      }
      if (dataSearchPlayer) {
        setPlayersView(dataSearchPlayer.searchplayer)
        setPlayerBititedAmount(dataSearchPlayer.searchplayer.minimum_bid)
        setSoldto(null);
      }
    }


  }, [loadingTeamButton, errorTeamButton, dataTeamButton, loadingSearchPlayer, errorSearchPlayer, dataSearchPlayer, searchinput])
  console.log(playerBititedAmount, "playerBititedAmount");
  console.log(soldto, "soldto");
  // const searchPlayersFun = () => {
  //   axios.get(`http://localhost:5000/api/search/searchplayers/${email}/${auction_id}/${searchinput}`)
  //     .then((response) => {
  //       setPlayersView(response.data[0])
  //       setPlayerBititedAmount(response.data[0].minimum_bid);
  //       setSoldto(null);
  //     })
  //     .catch((err) => {
  //       console.error("Error fetching players data:", err);
  //     })
  // }


  // useEffect(() => {
  //   searchPlayersFun()
  // }, [searchinput])
  // const teamButtonBalanceAmount=()=>{
  //   axios.get(`http://localhost:5000/api/teambitingbutton/button/${email}/${auction_id}`)
  //   .then((response) => {
  //     setTeamButtons(response.data)
  //   })
  //   .catch((err) => {
  //     console.error(err);
  //   })
  // }
  // useEffect(() => {
  //  teamButtonBalanceAmount()
  // }, []);
  const reduceTeamBalanceAmount = async (player_id_Params, soldPersonId) => {
    await axios.put(`http://localhost:5000/api/teambalance/updatebalance`, {
      player_id: player_id_Params,
      team_id: soldPersonId
    })
      .catch(err => {
        console.error(err);
      })
  }

  const addTeamBalanceAmount = async (player_id_Params) => {
    await axios.put(`http://localhost:5000/api/unsold/addamounttoteam`, {
      player_id: player_id_Params,
    })
      .catch(err => {
        console.error(err);
      })

  }


  const soldPlayersToTeams = async (soldPersonId, soldOrUnsold, soldPlayersAmount) => {
    if (soldOrUnsold === 'unsold') {
      addTeamBalanceAmount(playersView.player_id);
    }
    await axios.put(`http://localhost:5000/api/playeraddteam/joining/${email}/${playersView.player_id}`, {
      team_id: soldPersonId,
      sold_or_unsold: soldOrUnsold,
      sold_amount: soldPlayersAmount
    })
      .then(res => {
        refetchTeamButton()
        if (soldOrUnsold === 'sold')
          reduceTeamBalanceAmount(playersView.player_id, soldPersonId);
      })
      .catch((err) => {
        console.error(err);
      })
    // searchPlayersFun()
    refetchSearchPlayer()
  }

  const teamBitingButtonFun = (val) => {
    if (playerBititedAmount < val.balance_amount) {
      setSoldto(val.team_id);
      // setSoldTeamBalanceAmount(val.balance_amount)
      setPlayerBititedAmount(playerBititedAmount + playersView.bit_increase_by)
    }
    else {
      toast.error("Insufficient Balance")
    }
  }

  const unSoldPlayer = async () => {
    try {
      const { data } = await unsoldPlayersMutation({
        variables: {
          player_id: playersView.player_id,
        },
      });

      // Handle successful response
      console.log("data", data);
      refetchTeamButton()
      refetchSearchPlayer()

    } catch (error) {
      // Handle error
      console.error("Error : ", error);
    }

  }
  const soldPlayer = async (teamidSold, sold_amount) => {
    console.log("inputs:", playersView.player_id, teamidSold, "sold", sold_amount);
    try {
      const { data } = await soldPlayersMutation({
        variables: {
          player_id: playersView.player_id,
          team_id: teamidSold,
          sold_or_unsold: "sold",
          sold_amount: sold_amount,
        },
      });

      // Handle successful response
      console.log("data", data);
      refetchTeamButton()
      refetchSearchPlayer()

    } catch (error) {
      // Handle error
      console.error("Error : ", error);
    }
  }

  return (
    <div className='Biting'>
      {
        // bidingPanelView.current && 
        (teamButtons.length >= 4) ? (<><div className='BitingPlayerImage'>
          <div className='image'></div>
        </div>
          <div className='BitingPlayerDetails'>
            <div><label>Name</label><h5>{playersView.player_name}</h5></div>
            <div><label>Age</label><h5>{playersView.age}</h5></div>
            <div><label>Skills</label>
              <h5>
                {Array.isArray(playersView.skills) ? (
                  playersView.skills.map((skill, index) => (
                    <span key={index}>{skill}{index !== playersView.skills.length - 1 ? ', ' : ''}</span>
                  ))
                ) : (
                  <span>No skills available</span>
                )}
              </h5>
            </div>
            <div><label>Minimum Bit</label><h5>{playersView.minimum_bid}</h5></div>
            <div><label>Bit Increase By</label><h5>{playersView.bit_increase_by}</h5></div>
            <div><label>Sold Or Unsold</label><h5>{playersView.sold_or_unsold}</h5></div>
            <div><label>Sold Amount</label><h5>{playersView.sold_amount}</h5></div>
            {playersView.sold_or_unsold === 'sold' ? (
              <div style={{ backgroundImage: `url(${SoldImage})` }} className='soldorunsold'></div>

            ) : (
              <div style={{ backgroundImage: `none` }} className='soldorunsold'></div>

            )}
            {playersView.sold_or_unsold === 'sold' ? (
              <button onClick={() => unSoldPlayer()}>Unsold</button>
            ) : (
              <button onClick={() => { soldto !== null ? (soldPlayer(soldto, playerBititedAmount)) : (toast.error("Team is not selected to sold the player")); }}>Sold</button>
            )}

          </div>
          <div className='BitingControls'>
            <div className='minimumBitField'><input value={playerBititedAmount} type='text' readOnly></input></div>
            <h3>Teams</h3>
            <div className='displaysTeams'>
              {teamButtons.map((val, index) => {
                return (<div key={index}><label>Balance</label><label>{val.balance_amount}</label><button onClick={() => { teamBitingButtonFun(val); }}>{val.team_name}</button></div>)
              })}

            </div>
          </div></>) : (<div className='BidingWarning'><div className='BidingWarningText'>
            Biding start on Current Date and Need Minimum Four Teams and Minimum One Player to Start the Biding</div></div>)




      }
      <ToastContainer limit={1} position={'top-right'} pauseOnHover={false} pauseOnFocusLoss={false} draggable={false} closeOnClick={false} />
    </div>
  )
}

export default Biting