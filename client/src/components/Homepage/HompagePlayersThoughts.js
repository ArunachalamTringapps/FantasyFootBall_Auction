import React from 'react'
import '../../css/Homepagecss/HomepagePlayersThoughts.css'
import imageOne from '../../humanimg1.jpg'
import imageTwo from '../../humanimg2.jpg'
import imageThree from '../../humanimg3.avif'

function HompagePlayersThoughts() {
  const icons=[
    {
      image:imageOne,
      naming:'Aaran',
      position:'start',
      text:"Awesome auctions! Bid with ease... the customer service is some of if not tje best in the business. Enjoy! Keep on rockin'!"
    },
    {
      image:imageTwo,
      naming:'Ethan',
      position:'center',
      text:'hello'
    },
    {
      image:imageThree,
      naming:'David',
      position:'end',
      text:"welcome"
    }
  ]
  return (
    <div className='HomepagePlayersThoughts'>
    <div className='straightline'></div>
    <div className='boxContainer'>
      {
        icons.map((val)=>{
          return(
            <div style={{ alignSelf:`${val.position}`}} className='boxItems'>
            <div style={{backgroundImage:`url(${val.image})`}} className='imagefitting'></div>
              <h1>{val.naming}</h1>
              <p>{val.text}</p>
            
            </div>
          )
        })
      }
      {/* <div className='boxItemsOne'>
        <div className='imagefittingOne'></div>
        <h1>Kumar</h1>
        <p>hhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh</p>
      </div>
      <div className='boxItemsTwo'>hjk</div>
      <div className='boxItemsThree'>ghjk</div> */}
    </div>
    </div>
  )
}

export default HompagePlayersThoughts