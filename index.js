const express = require('express')

const server = express()
server.use(express.json())

const produtos = []

server.get('/produtos', (req, res) => {
  return res.json(produtos)
})

server.get('/produtos/:index', (req, res) => {
  return res.json(req.user)
})

server.post('/produtos', checkProductExists, (req, res) => {
  const { name } = req.body
  produtos.push(name)
  return res.json(produtos)
})

server.put('/produtos/:index', checkProductInArray, (req, res) => {
  const { index } = req.params
  const { name } = req.body

  produtos[index] = name

  return res.json(produtos)
})

server.delete('/produtos/:index', (req, res) => {
  const { index } = req.params

  produtos.splice(index, 1)

  return res.send()
})

function checkProductExists(req, res, next) {
  if (!req.body.name) {
    return res.status(400).json({ error: 'product name is required' })
  }
  return next()
}

function checkProductInArray(req, res, next) {
  const product = produtos[req.params.index]
  if (!product) {
    return res.status(400).json({ error: 'product does not exists' })
  }
  req.product = product

  return next()
}

server.listen(8888)