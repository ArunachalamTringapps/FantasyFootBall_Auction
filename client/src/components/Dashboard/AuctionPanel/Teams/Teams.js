import React, { useEffect, useState } from 'react'
import "../Teams/Teams.css"
import axios from 'axios'
import profile from "../../../../Image/no-profile-img.gif"
import { useNavigate } from 'react-router-dom'
// import Dropzone from 'react-dropzone';
import ImageUploader from 'react-image-uploader'; // Import the ImageUploader component
// import 'react-image-uploader/dist/styles.css';
const Teams = () => {
  const [teamlistdetails, setteamlistdetails] = useState([])
  const email = localStorage.getItem("useremail")
  const auction_id = localStorage.getItem("AuctionId")
  const navigate = useNavigate();
  useEffect(() => {
    axios.get(`http://localhost:5000/api/teamlist/view/${auction_id}/${email}`)
      .then((response) => {
        setteamlistdetails(response.data)
      })
      .catch((err) => {
        console.error(err);
      })
  }, [])
  const handleclickgoteam = () => {
    navigate('/user/dashboard/teamlist')
  }
  const handleedit = () => {
    navigate('/user/dashboard/teamsedit')
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
                  {/* <ImageUploader
                      src={val.team_image ? `http://localhost:5000/uploads/${val.team_image}` : profile}
                      alt={`Team ${val.team_id}`}
                      withPreview
                    /> */}
                     <ImageUploader
                      withIcon={true}
                      withPreview={true}
                      buttonText='Upload Team Image'
                      imgExtension={['.jpg', '.gif', '.png', '.jpeg']}
                      maxFileSize={5242880}
                      singleImage={true}
                      defaultImages={val.team_image ? [`http://localhost:5000/uploads/${val.team_image}`] : [profile]}
                    />
                  </div>
                  <div className='team-name-details'><div>Name:</div><div>{val.team_name}</div></div>
                  <div className='team-name-details'><div>Ownername:</div><div>{val.team_owner_name}</div></div>
                  <div className='team-name-details'><div>Balance:</div><div>{val.balance_amount}</div></div>
                  <div className='team-edit-delete'>
                    <button className='team-edit' onClick={() => { handleedit() }}>Edit</button>
                    <button className='team-delete'>Delete</button>
                  </div>
                </div>
              )
            })
          }
        </div>
      </div>

    </div>
  )
}

export default Teams