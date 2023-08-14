import React, { useRef } from 'react'
import './HomepageComplaints.css'
import img from '../../../Image/HomeComplaintsimage.jpg'
import emailjs from '@emailjs/browser';
function HomepageComplaints() {
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs.sendForm('service_xl7co6r', 'template_rf9srcr', form.current, 'LPNdnnFs1Aea3hW_p')
      .then((result) => {
        console.log(form.current);
        console.log(result.text);
        console.log('message sent');
      }, (error) => {
        console.log(error.text);
      });
    e.target.reset();
  };
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
          <img src={img} alt='complaintsimage' />
        </div>
        <div className='item-two'>
          <form ref={form} onSubmit={sendEmail} autoComplete='off'>
            <input type="text" name="user_name" placeholder="Name...." required />
            <input type="email" name="user_email" placeholder="Email_id..." required />
            <input type="text" name="phone_no" placeholder="Phone Number..." required />
            <input type="text" name="subject" placeholder="Subject..." required />
            <textarea type="text" id="message" name="message" placeholder="Message..." required />

            <button type='submit'>Send Message</button>

          </form>
        </div>
      </div>
    </div>
  )
}
export default HomepageComplaints