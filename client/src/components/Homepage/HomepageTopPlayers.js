import React from 'react'
import '../../css/Homepagecss/HomepageTopPlayers.css'
import messi from '../../Image/lionel-messi.jpg'
import ronaldo from '../../Image/ronaldo.jpg'
import neymar from '../../Image/neymarr.jpg'

function HomepageTopPlayers() { 
    const image=[
      {
        img: messi,
        name: "Lionel Andrés Messi",
        details: "https://en.wikipedia.org/wiki/Lionel_Messi",
        totalGames: "1028",
        goals :"807"

      },
      {
        img:ronaldo,
        name: "Cristiano Ronaldo",
        details: "https://en.wikipedia.org/wiki/Cristiano_Ronaldo",
        totalGames: "1168",
        goals: "837"
      },
      {
        img:neymar,
        name: "Neymar",
        details: "https://en.wikipedia.org/wiki/Neymar",
        totalGames: "708",
        goals: "436"
      }
    ]
  return (
    <div className='HomepageTopPlayers'>
      <div className='temp'>
        {
          image.map((val,index)=>{
            return(<div key={index} className='HomepageTopPlayersContainer'>
                <div style={{backgroundImage:`url(${val.img})`,backgroundPosition:'center top',backgroundSize:'cover'}} className='HomepageTopPlayersItems'>
                </div>
                <div className='HomepageTopPlayersItemsText'>
                <h1 className='name'>{val.name}
                <button onClick={()=>{window.location.href=`${val.details}`}}>Known More</button></h1>
                <div>
                <h1>{`Games ${val.totalGames}`}</h1>
                <h1>{`Goals ${val.goals}`}</h1>
                </div>
                </div>
                </div>
            )
          })
        }

      </div>
    </div>
  )
}

export default HomepageTopPlayers