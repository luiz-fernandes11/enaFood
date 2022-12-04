import Product from './models/product.js'

const success = (res, status) => (entity) => {
  if (entity) {
    res.status(status || 200).json(entity)
  }
  return null
}

export const index = ({ querymen: { query, select, cursor } }, res, next) =>
  Product.count(query)
    .then((count) =>
      Product.find(query, select, cursor).then((product) => ({
        produtos: product.map((product) => product.view()),
      })),
    )
    .then(success(res))
    .catch(next)

export const create = ({ bodymen: { body } }, res, next) =>
  Product.create(body)
    .then((product) => product.view(true))
    .then(success(res, 201))
    .catch(next)


export const update = ({ bodymen: { body }, params }, res, next) =>
  Product.findById(params.id)
    .then(notFound(res))
    .then((product) =>
      product ? Object.assign(product, body).save() : null,
    )
    .then((product) => (product ? product.view(true) : null))
    .then(success(res))
    .catch(next)

export const notFound = (res) => (entity) => {
  if (entity) {
    return entity
  }
  res.status(404).end()
  return null
}

export const destroy = ({ params }, res, next) =>
  Product.findById(params.id)
    .then(notFound(res))
    .then((product) => (product ? product.remove() : null))
    .then(success(res, 204))
    .catch(next)