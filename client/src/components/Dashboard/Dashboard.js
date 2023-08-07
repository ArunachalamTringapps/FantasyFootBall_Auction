import {React,useState,useEffect} from 'react'
import { useNavigate,Link,Routes,Route } from 'react-router-dom'
import '../../css/Dashboardcss/Dashboard.css'
import MyAuction from './MyAuction'
import CreateAuction from './CreateAuction'
import History from './History'
import Setting from './Setting'
import { AiOutlinePlus,AiOutlineFolderOpen,AiOutlineHistory,AiOutlineSetting } from "react-icons/ai";

function Dashboard() {
    const [changeComponents,setChangeComponent]=useState(1);
    const menuBarItems=[
        {
            index:1,
            path:"",
            name:"My Auction",
            component: <MyAuction />,
            logo: <AiOutlineFolderOpen />
        },
        {
            index:2,
            path:"createauction",
            name: "Create Auction",
            component: <CreateAuction />,
            logo: <AiOutlinePlus />
        },
        {
            index:3,
            path:"history",
            name: "History",
            component: <History />,
            logo: <AiOutlineHistory />
        },
        {
            index: 4,
            path:"setting",
            name: "Settings",
            component: <Setting />,
            logo: <AiOutlineSetting />
        }
    ]
    // const dashboardList=[<MyAuction />,<CreateAuction />,<History />,<Setting />]
    const navigate=useNavigate();
    const logout=()=>{
        localStorage.setItem("authentication","false");
        navigate("/login")
    }

    useEffect(()=>{
        console.log(changeComponents);
    })
  return (
    <div className='Dashboard'>
        <div className='DashboardMenu'>
            <div className='DashboardMenuHeader'>
                <div></div>
                <h4>Arunachalam M</h4>
                <h5>arunachalam@gmail.com</h5>
                <button onClick={logout}>Log Out</button>
                </div>
            <div className='DashboardMenuItems'>
            {
                menuBarItems.map((val)=>{
                    return <Link key={val.index} to={val.path} onClick={()=>setChangeComponent(val.index)} className={val.index===changeComponents?'DashboardMenuItemsListTrue':'DashboardMenuItemsListFalse'} >{val.logo}{val.name}</Link>
                })
            }
            </div>
        </div>
        <div className='DashboardContainer'>
        <Routes>
            <Route path='/' element={<MyAuction />}></Route>
            <Route path='/createauction' element={<CreateAuction />} />
            <Route path='/history' element={<History />} />
            <Route path='/setting' element={<Setting />} />
        </Routes>
        </div>
    </div>
  )
}

export default Dashboard