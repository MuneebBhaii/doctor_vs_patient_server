const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');
const app = express();
require('dotenv').config()
app.use(cors())

mongoose.connect(process.env.CONNECTION_STRING)
const db = mongoose.connection;

app.use(cors(
  {
    origin:["https://deploy-mern-!whq.vercel.app"],
    methods:["GET", "POST"],
    credentials:true
}
));
app.use(express.json())
// routes
const userAuth = require("./src/routes/authRoutes")
app.use("/" , userAuth)

db.on('error',(error)=>{
  console.error('error',error)
})

db.once('open',()=>{
  console.log("successfully connected to database")
  const port = process.env.PORT
  app.listen(port,()=>{
    console.log("server run on port " + port)
  })
})