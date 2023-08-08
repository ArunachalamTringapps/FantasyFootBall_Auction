import React from 'react'
import '../../css/Dashboardcss/MyAuction.css'

function MyAuction() {
  const email=localStorage.getItem("useremail")
  return (
    <div className='MyAuction'>
      <div className='MyAuctionLeft'>
          <div className='MyAuctionLeftBox'>
              <div className='MyAuctionLeftBoxImage'></div>
          </div>
          <div className='MyAuctionLeftAuctionContainer'>

          </div>
      </div>
      <div className='MyAuctionRight'>

      </div>

    </div>
  )
}

export default MyAuction