import express from 'express'
import Product, { schema } from './models/product.js'
import mongoose from 'mongoose'
import { middleware as query } from 'querymen'
import bodyParser from 'body-parser'
import { index } from './controller.js'
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



server.listen(8880)