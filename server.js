const express = require('express');
const app = express()
const mongoose = require('mongoose');
const PORT = process.env.PORT || 3001;
const routes = require('./routes');
const path = require('path')
const gameSeeds = require('./seeds/gameSeed');
const seedDB = true;
const db = require('./models');

app.use(express.urlencoded({ extended: true }));
app.use(express.json())

require('dotenv').config()

// app.use('*', (req, res, next) => {
//   console.log(req.originalUrl);
//   next()
// })

app.use(express.static(path.join(__dirname, "client/dist/client")))

app.use(routes)

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/teammatefinder",
  { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
  .then(() => {
    console.log('mongodb connected');
    if (seedDB) {
      console.log('seeding db games')
      db.Game.remove()
        .then(
          gameSeeds.forEach(game => {
            const newGame = new db.Game({
              title: game.title,
              img_url: game.img_url,
              developer: game.developer,
              team_game: game.team_game,
              reviewed: game.reviewed,
              userId: game.userId,
              ps4: game.ps4
            })
            newGame.save()
          })
        )
    }
    app.listen(PORT, () => {
      console.log(`server is live on http://localhost:${PORT}`)
    })
  })
  .catch(err => {
    console.log(err);
  })