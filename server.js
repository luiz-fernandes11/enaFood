const express = require('express'),
  app = express(),
  path = require('path')

var mongoose = require('mongoose')

mongoose.connect('mongodb://localhost/db_name')

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname + '/index.html'))
})

var adminRouter = express.Router()
var basicRoutes = express.Router()
var apiRoutes = express.Router()

adminRouter.use((req, res, next) => {
  console.log(req.method, req.url)
  next()
})

adminRouter.get('/', (req, res) => {
  res.send('Eu sou o dashboard!')
})

adminRouter.param('name', (req, res, next, name) => {
  console.log('validando o nome:' + name)
  req.name = name
  next()
})

adminRouter.get('/users/:name', (req, res) => {
  res.send('Faalaaa ' + req.name + '!')
})

adminRouter.get('/users', (req, res) => {
  res.send('Aqui listamos todos os usuários!')
})

adminRouter.get('/posts', (req, res) => {
  res.send('Aqui veremos todos os posts!')
})

app.route('/login')
  .get((req, res) => {
    res.send('this is the login form')
  })
  .post((req, res) => {
    console.log('processing')
    res.send('processing the login form!')
  })

app.use('/admin', adminRouter)
app.use('/', basicRoutes)
app.use('/api', apiRoutes)

app.listen(8001)
console.log('8001 é a porta mágica!')