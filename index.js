import express from 'express'
import Product, { schema } from './models/product.js'
import mongoose from 'mongoose'
import { middleware as query } from 'querymen'
import { middleware as body, Schema } from 'bodymen'
import bodyParser from 'body-parser'
import { index, create, update, destroy } from './controller.js'
export { Product, schema }

const server = express()
server.use(bodyParser.json())

mongoose.connect('mongodb://localhost:27017/CRM')
const { nome, preco, estoque } = schema.tree

server.get(
  '/carrinho',
  query({ origin: { type: String } }),
  index,
)

server.post(
  '/carrinho',
  body({ nome, preco, estoque }),
  create,
)

server.put('/carrinho/:id',
  body({ nome, preco, estoque }),
  update
)

server.delete('/carrinho/:id',
  destroy
)

server.listen(8880)