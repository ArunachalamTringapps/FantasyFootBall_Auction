const express = require('express');
const cors = require('cors');

const { registerroute, loginroute, createauctionroute, userdataroute, currentauctionroute, upcomingauctionroute, historyauctionroute, searchPlayersRoute, teamauctionroute, playerdetailsRoute, teamsJoinsPlayersRoute, topfiveplayersRoute, usereditroute,teambuttonRoute,playeraddteamRoute } = require('./backend/Route')

const app = express();
const port = 5000;
app.use(cors());
app.use(express.json());
app.use('/api/login', loginroute)
app.use('/api/register', registerroute)
app.use('/api', userdataroute, createauctionroute)
app.use('/api/auction', currentauctionroute, upcomingauctionroute, historyauctionroute)
app.use('/api/search', searchPlayersRoute)
app.use("/api/details", playerdetailsRoute, teamauctionroute)
app.use("/api/joins", teamsJoinsPlayersRoute)
app.use('/api/topplayers', topfiveplayersRoute)
app.use('/api/settings', usereditroute)
app.use('/api/teambitingbutton',teambuttonRoute)
app.use('/api/playeraddteam',playeraddteamRoute)


app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
