import React from 'react'
import '../../css/Homepagecss/HomepageComplaints.css'
import img from '../../Image/HomeComplaintsimage.jpg'
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
      <img src={img} alt='complaintsimage'/> 
      </div>
      <div className='item-two'>
      <form>
      <input type="text"  name="name" placeholder="Name...." required />
      <input type="email" name="email" placeholder="Email..." required />
      <input type="text"  name="phone" placeholder="Phone Number..." required />
      <input type="text"  name="sub" placeholder="Subject..." required />
      <textarea type="text" id="message" name="Message" placeholder="Message..." required />

      <button>Send Message</button>
      </form>
     </div>
    </div>
    </div>
  )
}

export default HomepageComplaints