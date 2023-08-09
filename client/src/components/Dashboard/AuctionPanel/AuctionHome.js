import React from 'react'

function AuctionHome() {
  const auctionPanelId=localStorage.getItem("AuctionId")
  return (
    <div>{auctionPanelId}</div>
  )
}

export default AuctionHome