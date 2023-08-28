import React from 'react'
import './Homepage.css'
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useEffect } from "react";
// import HomepageComplaints from './HomepageComplaints/HomepageComplaints';
import HomepageFooter from './HomepageFooter/HomepageFooter';
import HomepageHeader from './HomepageHeader/HomepageHeader';
import HomepageTopPlayers from './HomepageTopPlayers/HomepageTopPlayers';
import Homepagequotes from './Homepagequotes/Homepagequotes';
import HompagePlayersThoughts from './HomepagePlayersReview/HompagePlayersReview';





function Homepage() {
  const arrTags = [<HomepageHeader />, <HomepageTopPlayers />, <Homepagequotes />, <HompagePlayersThoughts />, <HomepageFooter />]
  const boxVariant = {
    visible: { opacity: 1, scale: 1, x: 0, transition: { duration: 1 } },
    hidden: { opacity: 0, scale: 0, x: 150 },
  }
  const HomepageBox = ({ nums }) => {
    const control = useAnimation()
    const [ref, inView] = useInView()
    useEffect(() => {
      if (inView) {
        control.start("visible");
      }
      else {
        control.start("hidden");
      }
    })
    return (
      <motion.div className='box' ref={ref} animate={control} initial="hidden" variants={boxVariant}>
        <div>{arrTags[nums]}</div>
      </motion.div>
    )
  }

  return (
    <div className='Homepage'>

      <HomepageBox nums={0} />
      <HomepageBox nums={1} />
      <HomepageBox nums={2} />
      <HomepageBox nums={3} />
      <HomepageBox nums={4} />
      {/* <HomepageBox nums={5} /> */}
    </div>
  )
}

export default Homepage