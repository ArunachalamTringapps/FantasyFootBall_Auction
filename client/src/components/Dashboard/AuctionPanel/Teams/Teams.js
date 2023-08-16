import React, { useEffect, useState } from 'react'
import "../Teams/Teams.css"
import axios from 'axios'
import profile from "../../../../Image/no-profile-img.gif"
import { useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const Teams = ({ playersTeamsEdit,teamsedit,setteamsedit,setdefaultteamname,setdefaultteamownername,setdefaultteamowneremail}) => {
  const [teamlistdetails, setteamlistdetails] = useState([])
  const email = localStorage.getItem("useremail")
  const auction_id = localStorage.getItem("AuctionId")
  const [teamsdelete,setteamsdelete]=useState('')
  const navigate = useNavigate();
  const displayTeams=()=>{
    axios.get(`http://localhost:5000/api/teamlist/view/${auction_id}/${email}`)
      .then((response) => {
        setteamlistdetails(response.data)
      })
      .catch((err) => {
        console.error(err);
      })
  }
  useEffect(() => {
    displayTeams()
  }, [])
  const handleclickgoteam = () => {
    navigate('/user/dashboard/teamlist')
  }
  const handleedit = (teamid,teamname,teamownername,teamowneremailid) => {
    setteamsedit(teamid)
    setdefaultteamname(teamname)
    setdefaultteamownername(teamownername)
    setdefaultteamowneremail(teamowneremailid)
    navigate('/user/dashboard/teamsedit')
  }
  const handledelete=(val)=>{
    setteamsedit(val)
    axios.delete(`http://localhost:5000/api/teamsdelete/settings/${val}`)
      .then((response) => {

        setteamsdelete(response.data)
        console.log("teams deleted",teamsdelete)
        displayTeams()
        // toast.success("Team deleted successfully")
        // navigate('/user/dashboard/auctionpanel')
      })
      .catch((err) => {
        console.error(err);
      })
  }
  return (
    <div className='teamdetails-container-list'>
      <div className='teamdetails-whole'>
        <div className='teamdetails-title'>
          <div>TeamList Details</div>
          <div><button onClick={() => { handleclickgoteam() }}>Create team</button></div>
        </div>
        <div className='teamdetails-view'>
          {
            teamlistdetails.map((val, index) => {
              return (
                <div key={index} className='team-listview-details'>
                  <div className='team-auction-image'>
                    {val.team_image ? (
                      <img src={`http://localhost:5000/uploads/${val.team_image}`} alt={`Team ${val.team_id}`} />
                    ) : (
                      <img src={profile} alt='Default' />
                    )}
                  </div>
                  <div className='team-name-details'><div>Name:</div><div>{val.team_name}</div></div>
                  <div className='team-name-details'><div>Ownername:</div><div>{val.team_owner_name}</div></div>
                  <div className='team-name-details'><div>Balance:</div><div>{val.balance_amount}</div></div>
                  <div className='team-edit-delete'>
                    <button className='team-edit' onClick={() => { handleedit(val.team_id,val.team_name,val.team_owner_name,val.team_owner_email_id) }}>Edit</button>
                    <button className='team-delete' onClick={() => { handledelete(val.team_id) }}>Delete</button>
                  </div>
                </div>
              )
            })
          }
        </div>
      </div>
      <ToastContainer limit={1} position={'top-right'} pauseOnHover={false} pauseOnFocusLoss={false} draggable={false} closeOnClick={false} />
    </div>
  )
}

export default Teams