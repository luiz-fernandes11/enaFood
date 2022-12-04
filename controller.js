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

