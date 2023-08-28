/* eslint-disable react-hooks/exhaustive-deps */
import { React, useState, useEffect, useRef } from 'react'
import { useNavigate, Link, Routes, Route } from 'react-router-dom'
import axios from 'axios'
import NoProfile from '../../Image/no-profile-img.gif'
import './Dashboard.css'
import MyAuction from './MyAuction/MyAuction'
import CreateAuction from './CreateAuction/CreateAuction'
import History from './History/History'
import Setting from './Setting'
import HistoryDetails from './History/HistoryDetails/HistoryDetails'
import AuctionHome from './AuctionPanel/AuctionHome'
import { AiOutlinePlus, AiOutlineFolderOpen, AiOutlineHistory, AiOutlineSetting,AiOutlineMenuUnfold } from "react-icons/ai";
import UserEdit from './UserEdit'
import Teamdetails from './AuctionPanel/Teams/Teamdetails'
import Teamsedit from './AuctionPanel/Teams/Teamsedit'
import PlayerEdit from './AuctionPanel/Players/PlayerEdit'
import CreatePlayers from './AuctionPanel/Players/CreatePlayers'
import { useQuery, gql } from '@apollo/client';


const GET_USER_DETAILS_QUERY=gql `
query getuser($
    : String!) {
    getuser(email_id: $email) {
      username
      email_id
    }
  }
`;

function Dashboard(email_id) {
    const email = localStorage.getItem("useremail")
    const token=localStorage.getItem("token")
   

    const [playersTeamsEdit, setplayersTeamsEdit] = useState(false);
    const [menuOpen,setMenuOpen]=useState(true);
    // const [bidingPanelView,setBidingPanelView]=useState(true);
    const bidingPanelView=useRef(false)
    console.log("useremail",email)
    const [changeComponents, setChangeComponent] = useState(1);
    const[teamsedit,setteamsedit]=useState('')
    const[defaulteamname,setdefaultteamname]=useState('')
    const[defaulteamownername,setdefaultteamownername]=useState('')
    const[defaulteamowneremail,setdefaultteamowneremail]=useState('')
    const [defaultusername,setdefaultusername]=useState('')
    // const [defaultpassword,setdefaultpassword]=useState('')
    const [defaultphonenumber,setdefaultphonenumber]=useState('8765453')
     const [defaultImage,setdefaultImage]=useState('')
    // const [playeredit,setplayerEdit]=useState('');
    const [playername,setplayerName]=useState('');
    const [playerage,setplayerage]=useState('');
    const [playerskills,setplayerskills]=useState('');
    const menuBarItems = [
        {
            index: 1,
            path: "",
            name: "My Auction",
            component: <MyAuction />,
            logo: <AiOutlineFolderOpen className='DashboardMenuItemsLogo' />
        },
        {
            index: 2,
            path: "createauction",
            name: "Create Auction",
            component: <CreateAuction />,
            logo: <AiOutlinePlus className='DashboardMenuItemsLogo' />
        },
        {
            index: 3,
            path: "history",
            name: "History",
            component: <History />,
            logo: <AiOutlineHistory className='DashboardMenuItemsLogo' />
        },
        {
            index: 4,
            path: "setting",
            name: "Settings",
            component: <Setting />,
            logo: <AiOutlineSetting />
        }
    ]
    const navigate = useNavigate();
    const logout = () => {
        localStorage.setItem("authentication", "false");
        localStorage.setItem("useremail", "")
        navigate("/login")
    }
    // const [userDetails, setuserDetails] = useState([])
    // useEffect(() => {
    //     // navigate("/user/dashboard/");
    //     axios.get(`http://localhost:5000/api/userdetails/${email}`)
    //         .then((response) => {
    //             setuserDetails(response.data)
    //         })
    //         .catch((err) => {
    //             console.error("Error fetching user data:", err);
    //         })
    //         // setplayerName('name');
            

    // }, [])
    const [teamhistory, setteamhistory] = useState(1)
    const updateMenuOpen = () => {
        console.log(window.innerWidth,"width");
        if (window.innerWidth <= 1000) {
            setMenuOpen(false);
        } else {
            setMenuOpen(true);
        }
    };
    useEffect(() => {
        updateMenuOpen();
        window.addEventListener('resize', updateMenuOpen);
        return () => {
            window.removeEventListener('resize', updateMenuOpen);
        };
    },[]);

    const { loading, error, data } = useQuery(GET_USER_DETAILS_QUERY, {
        variables: { email },
        context: {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      });
    
      if (loading) {
        return <p>Loading...</p>;
      }
    
      if (error) {
        return <p>Error: {error.message}</p>;
      }
    
      const user = data?.getuser;
      console.log("userssubi",user);
    //   if(user){
    //     navigate("/user/dashboard/");
    //   }

console.log("user details",user.email_id)

    return (
        <div className='Dashboard'>
            <div style={menuOpen?{width:'16vw'}:{width:'5vw',rowGap:'100px'}} className='DashboardMenu'>
                <div className='DashboardMenuHeader'>
                    <button onClick={()=>{menuOpen?setMenuOpen(false):setMenuOpen(true)}} className='MenuButton'><AiOutlineMenuUnfold className='button' /></button>
                    <div style={{display: menuOpen ? 'block' : 'none',backgroundImage: user.user_image? `url(http://localhost:5000/graphqlq)`: `url(${NoProfile})`,}}></div>
                    <h4 style={{display: menuOpen? 'block':'none'}}>{user.username}</h4>
                    <h5 style={{display: menuOpen? 'block':'none'}}>{user.email_id}</h5>
                    <button style={{display: menuOpen? 'block':'none'}} className='logout' onClick={logout}>Log Out</button>
                </div>
                <div className='DashboardMenuItems'>
                    {
                        menuBarItems.map((val) => {
                            return <Link key={val.index} to={val.path} onClick={() => setChangeComponent(val.index)} className={val.index === changeComponents ? 'DashboardMenuItemsListTrue' : 'DashboardMenuItemsListFalse'} >{val.logo}{menuOpen ? val.name : null}</Link>
                        })
                    }
                </div>  
            </div>
            <div className='DashboardContainer'>
                <Routes>
                <Route path='/' element={<MyAuction setplayersTeamsEdit={setplayersTeamsEdit} bidingPanelView={bidingPanelView} />}></Route>
                    <Route path='/auctionpanel/*' element={<AuctionHome playersTeamsEdit={playersTeamsEdit} bidingPanelView={bidingPanelView} setteamsedit={setteamsedit} setdefaultteamname={setdefaultteamname} setdefaultteamownername={setdefaultteamownername} setdefaultteamowneremail={setdefaultteamowneremail} defaulteamownername={defaulteamownername} defaulteamowneremail={defaulteamowneremail} setplayerName={setplayerName} setplayerage={setplayerage} setplayerskills={setplayerskills} setdefaultImage={setdefaultImage}/>} />
                    <Route path='/createauction' element={<CreateAuction />} />
                    <Route path='/history' element={<History setteamhistory={setteamhistory} />} ></Route>
                    <Route path='/auctiondetails' element={<HistoryDetails teamhistory={teamhistory} />} />
                    <Route path='/setting' element={<Setting setdefaultusername={setdefaultusername}  setdefaultphonenumber={setdefaultphonenumber} />} />
                    <Route path='/useredit' element={<UserEdit defaultusername={defaultusername} defaultphonenumber={defaultphonenumber} />} />
                    <Route path='/teamlist' element={<Teamdetails />}/>
                    <Route path='/teamsedit' element={<Teamsedit teamsedit={teamsedit} defaulteamname={defaulteamname} defaulteamownername={defaulteamownername} defaulteamowneremail={defaulteamowneremail} defaultImage={defaultImage}/>}/>
                    <Route path='/playersedit' element={<PlayerEdit playername={playername} playerage={playerage} playerskills={playerskills}/>} />
                    <Route path='/createplayers' element={<CreatePlayers />} />
                </Routes>
            </div>
        </div>
    )
}

export default Dashboard