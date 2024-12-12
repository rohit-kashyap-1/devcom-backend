const express = require('express')
const bcrypt = require('bcrypt');
const mongoose = require('mongoose')

const app = express()
app.set('view engine', 'ejs')
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static(__dirname + '/public'))
require('dotenv').config(); // Load environment variables
const mongoURI = process.env.MONGO_URI; // Load from .env

mongoose.connect(mongoURI, {})

const Admin = require('./models/Admin.js')


app.get('/', (req, res) => {
  res.render('index')
})
app.get('/login', (req, res) => {
  res.render('login')
})
app.post('/login', async (req, res) => {
  const username = req.body.username;
  const password = req.body.password

  bcrypt.hash(password, 10, async (err, hash) => {
    if (err)
      res.redirect('/login')
    else {

      const admin = await Admin.findOne({ username });
      console.log(username)
      if (!admin) {
        return res.status(404).json({ error: 'Admin not found' });
      }

      // Match the entered password
      const isMatch = await admin.matchPassword(password);
      if (!isMatch) {
        return res.status(401).json({ error: 'Invalid credentials' });
      }

      res.redirect("/")
      //
      //mongodb instance
      //fetch data
      //authenticate
      //jwt token
      //express session
      //redirect index
      //render('index')
     // res.send("user is loggedin")
    }
  });

  //fetch data using username,
  //then match db password hash with current password hash

  //first convert the user password hash and then search username and this hash in the db
})


app.listen(4000, () => {
  console.log('server is running 4000')
})
