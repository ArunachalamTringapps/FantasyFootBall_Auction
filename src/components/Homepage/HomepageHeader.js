import React from 'react'
import { IoFootball,IoArrowRedoOutline } from "react-icons/io5";
import '../../css/Homepagecss/HomepageHeader.css'

function HomepageHeader() {
  return (
    <header>
        <div className='Homepageheadertop'>
        <h1><span>A</span>UCTI<span><IoFootball /></span>N</h1>
        <div><button>Login <IoArrowRedoOutline /></button></div>
        </div>

        <div className='Homepageheaderbottom'>
            <h1 >Fantasy Footboll</h1>
            <div>Auction</div>
        </div>
    </header>
  )
}

export default HomepageHeader