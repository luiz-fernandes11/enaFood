import mongoose, { Schema } from 'mongoose'
//const mongoose = require('mongoose')
//const Schema = mongoose.Schema

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

productSchema.methods = {
  view(full) {
    const view = {
      // simple view
      id: this.id,
      nome: this.nome,
      preco: this.preco,
      estoque: this.estoque
    }

    return full
      ? {
        ...view,
        // add properties for a full view
      }
      : view
  },
}




//module.exports = mongoose.model('Product', productSchema)
const model = mongoose.model('Product', productSchema)

export const schema = model.schema
export default model 