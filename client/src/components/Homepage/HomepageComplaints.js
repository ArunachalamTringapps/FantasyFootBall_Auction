import React from 'react'
import '../../css/Homepagecss/HomepageComplaints.css'
function HomepageComplaints() {
  return (
    <div className='HomepageComplaints'> 
    <div className='items'>
      <div className='item-one'>
        <img src='https://img.freepik.com/free-photo/full-shot-man-playing-football_23-2150465400.jpg?w=2000' alt='complaintsimage'/>
      </div>
      <div className='item-two'>
      <form>
      <input type="text" id="name" name="name" placeholder="Name" required />
      <input type="text" id="name" name="email" placeholder="Email" required />
      <input type="text" id="name" name="phone" placeholder="Phone Number" required />
      <input type="text" id="name" name="sub" placeholder="Subject" required />
      <input type="text" id="message" name="Message" placeholder="Message" required />
      <button>Send Message</button>
      </form>
     </div>
    </div>
    </div>
  )
}

export default HomepageComplaints