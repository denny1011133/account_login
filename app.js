// include packages and define server related variables
const express = require('express')
const exphbs = require('express-handlebars')
const app = express()
const port = 3000
const bodyParser = require('body-parser')
const checkID = require('./checkID.js')
// setting static files
app.use(express.static('public'))
// setting body-parser
app.use(bodyParser.urlencoded({ extended: true }))
// setting template engine
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

// setting routes
app.get('/', (req, res) => {
  res.render('index')
})
app.post('/', (req, res) => {
  const userData = req.body //記錄使用者輸入的資料
  const result = checkID(userData)//回傳name
  const failMessage = "Email/Password 錯誤"
  if (result) {
    res.render('success', { result })
  }
  else res.render('index', { failMessage })
})
// starts the express server and listening for connections.
app.listen(port, () => {
  console.log(`Express app listening on port ${port}.`)
})