// include packages and define server related variables
const express = require('express')
const exphbs = require('express-handlebars')
const app = express()
const port = 3000
const bodyParser = require('body-parser')
const checkID = require('./checkID.js')
const session = require('express-session')

// setting static files
app.use(express.static('public'))

// setting body-parser
app.use(bodyParser.urlencoded({ extended: true }))

// setting template engine
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

// setting session
app.use(session({
  secret: 'secret cat',
  cookie: { maxAge: 60 * 1000 }
}))

// setting routes
app.get('/', (req, res) => {
  if (!req.session.name) {
    res.render('index')
  } else {
    res.render('welcome', { sentence: 'We recognize you! ', result: req.session.name })
  }
})

app.post('/', (req, res) => {
  const userData = req.body //記錄使用者輸入的資料
  const result = checkID(userData)//回傳name
  const failMessage = "Email/Password 錯誤"
  req.session.name = result
  if (result) {
    res.render('welcome', { result })
  }
  else res.render('index', { failMessage })
})

app.get('/logout', (req, res) => {
  req.session.destroy()
  return res.redirect('/')
})






// starts the express server and listening for connections.
app.listen(port, () => {
  console.log(`Express app listening on port ${port}.`)
})