import {React,useState,useEffect} from 'react'
import '../../css/Dashboardcss/Dashboard.css'
import MyAuction from './MyAuction'
import CreateAuction from './CreateAuction'
import History from './History'
import Setting from './Setting'

function Dashboard() {
    const [changeComponents,setChangeComponent]=useState(0);
    const menuBarItems=[
        {
            index:1,
            name:"My Auction"
        },
        {
            index:2,
            name: "Create Auction"
        },
        {
            index:3,
            name: "History"
        },
        {
            index: 4,
            name: "Settings"
        }
    ]
    const dashboardList=[<MyAuction />,<CreateAuction />,<History />,<Setting />]
    const dashboardComponent=((index)=>{
        setChangeComponent(index);
    })
    useEffect(()=>{
        console.log(changeComponents);
    })
  return (
    <div className='Dashboard'>
        <div className='DashboardMenu'>
            <div className='DashboardMenuHeader'>Arunachalam M</div>
            {
                menuBarItems.map((val)=>{
                    return <div key={val.index} className="DashboardMenuItemsList" onClick={() => { console.log(val.index);setChangeComponent(val.index) } }>{val.name}</div>
                })
            }
        </div>
        <div className='DashboardContainer'>
            {dashboardList[changeComponents]}
        </div>
    </div>
  )
}

export default Dashboard