import React from 'react'
import '../../css/Homepagecss/HomepageComplaints.css'
function HomepageComplaints() {
  return (
    <div className='HomepageComplaints'>
    <div className='header'>
      <div>C</div>
      <div>O</div>
      <div>M</div>
      <div>P</div>
      <div>L</div>
      <div>A</div>
      <div>I</div>
      <div>N</div>
      <div>T</div>
      <div>S</div>
    </div>
    <div className='items'>
      <div className='item-one'>
        {/* <img src='https://media.istockphoto.com/id/1219371111/photo/football-or-soccer-player-in-action-on-stadium-with-flashlights-kicking-ball-for-winning-goal.jpg?s=612x612&w=0&k=20&c=ST_IFcG0FgEymCdEYV4X11SuW8lltXaR46E0yiv6k_0=' alt='complaintsimage'/> */}
        {/* https://images.unsplash.com/photo-1560272564-c83b66b1ad12?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Zm9vdGJhbGwlMjBraWNrfGVufDB8fDB8fHww&w=1000&q=80 */}
      <img src='https://media.istockphoto.com/id/466169394/photo/soccer-player-in-action.jpg?s=612x612&w=0&k=20&c=bs_v9JWOVxc8oaPSsudGNpHNRPD-GXej4d4a7hCnGpA=' alt='complaintsimage'/> 
      </div>
      <div className='item-two'>
      <form>
      <input type="text"  name="name" placeholder="Name...." required />
      <input type="email" name="email" placeholder="Email..." required />
      <input type="text"  name="phone" placeholder="Phone Number..." required />
      <input type="text"  name="sub" placeholder="Subject..." required />
      <input type="text" id="message" name="Message" placeholder="Message..." required />
      <button>Send Message</button>
      </form>
     </div>
    </div>
    </div>
  )
}

export default HomepageComplaints