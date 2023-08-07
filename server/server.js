const express = require('express');
const cors = require('cors');

const {registerroute,loginroute,auctionroute,userdataroute,currentauctionroute,upcomingauctionroute,historyauctionroute}=require('./backend/Route')

const app = express();
const port = 5000;
app.use(cors());
app.use(express.json());
app.use('/api/login',loginroute)
app.use('/api/register',registerroute)
app.use('/api/createauction',auctionroute)
app.use('/api',userdataroute)
app.use('/api/auction',currentauctionroute,upcomingauctionroute,historyauctionroute)


  app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
  });
  