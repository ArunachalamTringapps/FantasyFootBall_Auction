import React from 'react'
import './HomepagePlayersThoughts.css'
import imageOne from '../../../Image/humanimg1.jpg'
import imageTwo from '../../../Image/humanimg2.jpg'
import imageThree from '../../../Image/humanimg3.avif'

function HompagePlayersThoughts() {
  const icons = [
    {
      image: imageOne,
      naming: 'Aaran',
      position: 'start',
      text: "Awesome auctions! Bid with ease... the customer service is some of if not tje best in the business. Enjoy! Keep on rockin'!"
    },
    {
      image: imageTwo,
      naming: 'Ethan',
      position: 'center',
      text: 'Really good and i like it a lot they are legit and yea..'
    },
    {
      image: imageThree,
      naming: 'David',
      position: 'end',
      text: "The best there is in the auction business. Honest, dependable and some high-quality memorabilia. My favorite auction site"
    }
  ]
  return (
    <div className='HomepagePlayersThoughts'>
      <div className='straightline'></div>
      <div className='boxContainer'>
        {
          icons.map((val, index) => {
            return (
              <div key={index} style={{ alignSelf: `${val.position}` }} className='boxItems'>
                <div style={{ backgroundImage: `url(${val.image})` }} className='imagefitting'></div>
                <h1>{val.naming}</h1>
                <p>{val.text}</p>

              </div>
            )
          })
        }
      </div>
    </div>
  )
}

export default HompagePlayersThoughts