/* eslint-disable react-hooks/exhaustive-deps */
import { React, useState, useEffect } from 'react'
import { useNavigate, Link, Routes, Route } from 'react-router-dom'
import axios from 'axios'
import './Dashboard.css'
import MyAuction from './MyAuction/MyAuction'
import CreateAuction from './CreateAuction/CreateAuction'
import History from './History/History'
import Setting from './Setting'
import HistoryDetails from './History/HistoryDetails/HistoryDetails'
import AuctionHome from './AuctionPanel/AuctionHome'
import { AiOutlinePlus, AiOutlineFolderOpen, AiOutlineHistory, AiOutlineSetting } from "react-icons/ai";
import UserEdit from './UserEdit'
import Teamdetails from './AuctionPanel/Teams/Teamdetails'
import Teamsedit from './AuctionPanel/Teams/Teamsedit'
// import Players from './AuctionPanel/Players/Players'
import PlayerEdit from './AuctionPanel/Players/PlayerEdit'
import CreatePlayers from './AuctionPanel/Players/CreatePlayers'

function Dashboard(email_id) {
    const email = localStorage.getItem("useremail")
    const [playersTeamsEdit, setplayersTeamsEdit] = useState(false);
    const [bidingPanelView,setBidingPanelView]=useState(true);
    console.log(email_id)
    const [changeComponents, setChangeComponent] = useState(1);
    const[teamsedit,setteamsedit]=useState('')
    const[defaulteamname,setdefaultteamname]=useState('')
    const[defaulteamownername,setdefaultteamownername]=useState('')
    const[defaulteamowneremail,setdefaultteamowneremail]=useState('')
    const [defaultusername,setdefaultusername]=useState('')
    // const [defaultpassword,setdefaultpassword]=useState('')
    const [defaultphonenumber,setdefaultphonenumber]=useState('8765453')
    // const [defaultImage,setdefaultImage]=useState('')
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
            logo: <AiOutlineFolderOpen />
        },
        {
            index: 2,
            path: "createauction",
            name: "Create Auction",
            component: <CreateAuction />,
            logo: <AiOutlinePlus />
        },
        {
            index: 3,
            path: "history",
            name: "History",
            component: <History />,
            logo: <AiOutlineHistory />
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
    const [userDetails, setuserDetails] = useState([])
    useEffect(() => {
        // navigate("/user/dashboard/");
        axios.get(`http://localhost:5000/api/userdetails/${email}`)
            .then((response) => {
                setuserDetails(response.data)
            })
            .catch((err) => {
                console.error("Error fetching user data:", err);
            })
            // setplayerName('name');
            

    }, [])
    console.log(userDetails);
    const [teamhistory, setteamhistory] = useState(1)
    return (
        <div className='Dashboard'>
            <div className='DashboardMenu'>
                <div className='DashboardMenuHeader'>
                    <div></div>
                    <h4>{userDetails.username}</h4>
                    <h5>{userDetails.email_id}</h5>
                    <button onClick={logout}>Log Out</button>
                </div>
                <div className='DashboardMenuItems'>
                    {
                        menuBarItems.map((val) => {
                            return <Link key={val.index} to={val.path} onClick={() => setChangeComponent(val.index)} className={val.index === changeComponents ? 'DashboardMenuItemsListTrue' : 'DashboardMenuItemsListFalse'} >{val.logo}{val.name}</Link>
                        })
                    }
                </div>
            </div>
            <div className='DashboardContainer'>
                <Routes>
                    <Route path='/' element={<MyAuction setplayersTeamsEdit={setplayersTeamsEdit} setBidingPanelView={setBidingPanelView} />}></Route>
                    <Route path='/auctionpanel/*' element={<AuctionHome playersTeamsEdit={playersTeamsEdit} bidingPanelView={bidingPanelView} setteamsedit={setteamsedit} setdefaultteamname={setdefaultteamname} setdefaultteamownername={setdefaultteamownername} setdefaultteamowneremail={setdefaultteamowneremail} defaulteamownername={defaulteamownername} defaulteamowneremail={defaulteamowneremail} setplayerName={setplayerName} setplayerage={setplayerage} setplayerskills={setplayerskills} playername={playername} playerage={playerage} playerskills={playerskills}/>} />
                    <Route path='/createauction' element={<CreateAuction />} />
                    <Route path='/history' element={<History setteamhistory={setteamhistory} />} ></Route>
                    <Route path='/auctiondetails' element={<HistoryDetails teamhistory={teamhistory} />} />
                    <Route path='/setting' element={<Setting setdefaultusername={setdefaultusername}  setdefaultphonenumber={setdefaultphonenumber} />} />
                    <Route path='/useredit' element={<UserEdit defaultusername={defaultusername} defaultphonenumber={defaultphonenumber} />} />
                    <Route path='/teamlist' element={<Teamdetails />}/>
                    <Route path='/teamsedit' element={<Teamsedit teamsedit={teamsedit} defaulteamname={defaulteamname} defaulteamownername={defaulteamownername} defaulteamowneremail={defaulteamowneremail}/>}/>
                    {/* <Route path='/playerslist' element={<Players setplayerName={setplayerName}/>}/>  */}
                    {/* setplayerName={setplayerName} setplayerage={setplayerage} setplayerskills={setplayerskills} */}
                    <Route path='/playersedit' element={<PlayerEdit playername={playername} playerage={playerage} playerskills={playerskills}/>} />
                    <Route path='/createplayers' element={<CreatePlayers />} />
                </Routes>
            </div>
        </div>
    )
}

export default Dashboard