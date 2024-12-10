const express = require('express')
const bcrypt = require('bcrypt');

const app = express()
app.set('view engine', 'ejs')
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static(__dirname + '/public'))

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
    if(err)
        res.redirect('/login')
    else{
      //mongodb instance
      //fetch data
      //authenticate
      //jwt token
      //expression
      //redirect index
      //render('index')
    }
  });

  //fetch data using username,
  //then match db password hash with current password hash

  //first convert the user password hash and then search username and this hash in the db
})


app.listen(4000, () => {
  console.log('server is running 4000')
})
