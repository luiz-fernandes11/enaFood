const express = require('express')
const server = express()
server.use(express.json())
var mongoose = require('mongoose')
const product = require('./models/product')
var apiRouter = express.Router()

mongoose.connect('mongodb://localhost:27017/CRM')

const carrinho = []

server.get('/carrinho', (req, res) => {
  return res.json(carrinho)
})


/*server.route('/carrinho')
  .post(function(req, res) {
    var produto = new product()
    produto.nome = req.body.name
    produto.preco = req.body.preco
    produto.estoque = req.body.estoque

    produto.save(function(err){
      if(err){
        if(err.code === 11000){
          return res.json({
            sucess: false,
            message: 'já existe um produto com esse nome!'
          })
        } else{
          return res.send(err)
        }
      }
      res.json({message: 'Produto criado!'})
    })
  })*/

server.get('/carrinho/:index', (req, res) => {
  return res.json(req.user)
})

server.post('/carrinho', checkProductExists, (req, res) => {
  const { name } = req.body
  carrinho.push(name)
  return res.json(carrinho)
})

server.put('/carrinho/:index', checkProductInArray, (req, res) => {
  const { index } = req.params
  const { name } = req.body

  carrinho[index] = name

  return res.json(carrinho)
})

server.delete('/carrinho/:index', (req, res) => {
  const { index } = req.params

  carrinho.splice(index, 1)

  return res.send()
})

function checkProductExists(req, res, next) {
  if (!req.body.name) {
    return res.status(400).json({ error: 'product name is required' })
  }
  return next()
}

function checkProductInArray(req, res, next) {
  const cart = carrinho[req.params.index]
  if (!cart) {
    return res.status(400).json({ error: 'product does not exists' })
  }
  req.cart = cart

  return next()
}

server.listen(8888)