const express = require('express');
const cors = require('cors');

const {registerroute,loginroute,auction}=require('./backend/Route')

const app = express();
const port = 5000;
app.use(cors());
app.use(express.json());
app.use('/api/login',loginroute)
app.use('/api/register',registerroute)
app.use('/api/auction',auction)


  app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
  });
  