const mongoose = require('mongoose')
const Schema = mongoose.Schema

const productSchema = new Schema({
  nome: {
    type: String,
    text: true,
    required: true
  },
  preco: {
    type: String,
    text: true,
    required: true
  },
  estoque: {
    type: Number,
    required: true
  }
})

module.exports = mongoose.model('Product', productSchema)