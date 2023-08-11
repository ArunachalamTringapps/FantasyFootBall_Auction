import React from 'react'
import '../../css/Homepagecss/Homepagequotes.css'
import imgOne from '../../Image/Homepagequotesimage1.jpg';
import imgTwo from '../../Image/Homepagequotesimage2.jpg';


function Homepagequotes() {
  return (
    <div className='Homepagequotes'>
      <h1>WHAT LIFE <img src={imgOne} alt="image1" /></h1>
      <h1><img src={imgTwo} alt="image2" />WITHOUT</h1>
      <h1>GOALS</h1>
    </div>
  )
}

export default Homepagequotes