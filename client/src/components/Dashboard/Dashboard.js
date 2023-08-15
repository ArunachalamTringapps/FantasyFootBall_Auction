/* eslint-disable react-hooks/exhaustive-deps */
import { React, useState, useEffect, useRef } from 'react'
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



function Dashboard(email_id) {
    const email = localStorage.getItem("useremail")
    const [playersTeamsEdit, setplayersTeamsEdit] = useState(false);
    // const [bidingPanelView,setBidingPanelView]=useState(true);
    const bidingPanelView=useRef(false)
    console.log(email_id)
    const [changeComponents, setChangeComponent] = useState(1);
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
                    <Route path='/' element={<MyAuction setplayersTeamsEdit={setplayersTeamsEdit} bidingPanelView={bidingPanelView} />}></Route>
                    <Route path='/auctionpanel/*' element={<AuctionHome playersTeamsEdit={playersTeamsEdit} bidingPanelView={bidingPanelView} />} />
                    <Route path='/createauction' element={<CreateAuction />} />
                    <Route path='/history' element={<History setteamhistory={setteamhistory} />} ></Route>
                    <Route path='/auctiondetails' element={<HistoryDetails teamhistory={teamhistory} />} />
                    <Route path='/setting' element={<Setting />} />
                    <Route path='/useredit' element={<UserEdit />} />
                    <Route path='/teamlist' element={<Teamdetails/>}/>
                    <Route path='/teamsedit' element={<Teamsedit/>}/>
                </Routes>
            </div>
        </div>
    )
}

export default Dashboard