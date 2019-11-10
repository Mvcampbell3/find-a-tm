const express = require('express');
const app = express()
const mongoose = require('mongoose');
const PORT = process.env.PORT || 3001;
const routes = require('./routes');
const path = require('path')

// For creating seed db

const seedDB = false;
const db = require('./models');
const gameSeeds = require('./seeds/gameSeed');
const userSeeds = require('./seeds/userSeed');

// For creating seed user-password
const bcrypt = require('bcrypt');

// Init Middleware

app.use(express.urlencoded({ extended: true }));
app.use(express.json())

require('dotenv').config()

app.use(express.static(path.join(__dirname, "client/dist/client")))

app.use(routes)

// Connect Mongoose, check if want to seed db;

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/teammatefindertest",
  { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
  .then(() => {
    console.log('mongodb connected');

    // If seed, run seed functions
    if (seedDB) {
      console.log('removing matrix and game dbs and seeding db games')
      // Remove Matrixes from Users
      db.Matrix.find()
        .then(matrixes => {
          matrixes.forEach(matrix => matrix.remove());
        })
      
      // Delete all games then seed
      db.Game.deleteMany()
        .then(
          gameSeeds.forEach((game, i) => {
            const newGame = new db.Game({
              title: game.title,
              img_url: game.img_url,
              developer: game.developer,
              team_game: game.team_game,
              reviewed: game.reviewed,
              userID: game.userID,
              ps4: game.ps4,
              xbox: game.xbox,
              nin_switch: game.nin_switch
            })
            newGame.save()
              .then(() => {
                console.log(`Loaded ${i + 1} of ${gameSeeds.length} games`)
              })
          })
        )

      // Delete all users then seed
      db.User.deleteMany()
        .then(() => {
          userSeeds.forEach((user, i) => {

            bcrypt.genSalt(10, function(err, salt) {
              if (err) {
                throw err;
              }
              bcrypt.hash(user.password, salt, function(err, hash) {
                const newUser = new db.User({
                  username: user.username,
                  email: user.email,
                  password: hash
                })
                newUser.save()
                  .then(() => {
                    console.log(`Loaded ${i + 1} of ${userSeeds.length} users`)
                  })
              })
            })
          })
        })
    }
    // End of seed functions

    // Start backend server
    app.listen(PORT, () => {
      console.log(`server is live on http://localhost:${PORT}`)
    })
  })
  .catch(err => {
    console.log(err);
  })