import React from 'react'
import { IoArrowRedoOutline } from "react-icons/io5";
import { GiThreeBurningBalls } from "react-icons/gi";
import './HomepageHeader.css'
import { Link } from 'react-router-dom';

function HomepageHeader() {
  return (
    <header>
      <div className='Homepageheadertop' >
        <h1><span>A</span>UCTI<span><GiThreeBurningBalls /></span>N</h1>
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