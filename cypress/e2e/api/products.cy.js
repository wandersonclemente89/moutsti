import {
  createUser,
  deleteUser
} from '../../support/api/users.api'

import { login } from '../../support/api/auth.api'

import {
  createProduct,
  deleteProduct
} from '../../support/api/products.api'

describe('Products API Tests', () => {
  let userId
  let productId
  let token

  const email = `test_${Date.now()}@example.com`
  const password = 'password123'

  before(() => {
    createUser({
      email,
      password
    })
      .then((response) => {
        expect(response.status).to.eq(201)
        userId = response.body._id
        return login({
          email,
          password
        })
      })
      .then((response) => {
        expect(response.status).to.eq(200)
        token = response.body.authorization
      })
  })

  after(() => {
    if (productId) {
      deleteProduct(token, productId, {
        failOnStatusCode: false
      })
    }
    if (userId) {
      deleteUser(userId, {
        failOnStatusCode: false
      })
    }
  })

  it('creates a product', () => {
    createProduct(token).then((response) => {
      expect(response.status).to.eq(201)
      productId = response.body._id
    })
  })
})