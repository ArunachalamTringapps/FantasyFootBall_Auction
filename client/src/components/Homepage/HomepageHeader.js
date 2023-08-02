import React from 'react'
import { IoFootball,IoArrowRedoOutline } from "react-icons/io5";
import '../../css/Homepagecss/HomepageHeader.css'
import { Link } from 'react-router-dom';

function HomepageHeader() {
  return (
    <header>
        <div className='Homepageheadertop'>
        <h1><span>A</span>UCTI<span><IoFootball /></span>N</h1>
        <div><Link to='/login' ><button>Login<IoArrowRedoOutline /></button></Link></div>
        </div>

        <div className='Homepageheaderbottom'>
            <h1 >Fantasy Football</h1>
            <div>Auction</div>
        </div>
    </header>
  )
}

export default HomepageHeader