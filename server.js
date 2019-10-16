const express = require('express');
const app = express()
const mongoose = require('mongoose');
const PORT = process.env.PORT || 3001;
const routes = require('./routes');
const path = require('path')

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
  { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('mongodb connected');
    app.listen(PORT, () => {
      console.log(`server is live on http://localhost:${PORT}`)
    })
  })
  .catch(err => {
    console.log(err);
  })