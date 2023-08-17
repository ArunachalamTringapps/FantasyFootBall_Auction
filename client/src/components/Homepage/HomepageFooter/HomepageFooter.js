/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react'
import {Link} from 'react-router-dom'
import './HomepageFooter.css'
import { FaFacebook, FaTelegram, FaYoutube, FaInstagram, FaTiktok } from 'react-icons/fa';
function HomepageFooter() {
  return (
    <div className='HeaderFooter'>
      <div className='box-one'>
        {/* <div className='box-one-container'> */}
          <h1>LET'S TALK!</h1>
          <form>
            <input className='Fullname' type='text' name='fullname' placeholder='Full name...' required />
            <input className='Email' type='text' name='email' placeholder='Email...' required />
            <input className='Message' type='text' name='message' placeholder='Message...' required />
            <div>
              <p>By submitting this form we agree to this <a href=''>Private Policy</a></p>
              <button type='submit'>Submit</button>
            </div>
          </form>
        {/* </div> */}
      </div>
      <div className='box-two'>
        <div className='box-two-containerone'>
          <h1>Follow Us</h1>
        </div>
        <div className='box-two-containertwo'>
          <div>#HEALTH</div>
          <div>#SPORT</div>
          <div>#STAYACTIVE</div>
        </div>
        <div className='box-two-containerthree'>
          <div className='icons-one'>
            <Link  to='https://stackoverflow.com/questions/48924672/can-i-use-href-tag-in-reactjs'><FaFacebook /></Link>
            <Link   to='https://stackoverflow.com/questions/48924672/can-i-use-href-tag-in-reactjs'><FaTelegram /></Link>
            <Link  to='https://stackoverflow.com/questions/48924672/can-i-use-href-tag-in-reactjs'><FaYoutube /></Link>

          </div>
          <div className='icons-two'>
            {/* <div></div> */}
            <Link  to='https://stackoverflow.com/questions/48924672/can-i-use-href-tag-in-reactjs'><FaInstagram /></Link>
            <Link  to='https://stackoverflow.com/questions/48924672/can-i-use-href-tag-in-reactjs'><FaTiktok /></Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HomepageFooter