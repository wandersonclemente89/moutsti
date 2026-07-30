import { login } from './../../support/api/auth.api'
import {
  createUser,
  deleteUser
} from '../../support/api/users.api'

describe('Login API Tests', () => {
  let userId
  let token
  const generateRandomEmail = `user${Date.now()}@example.com`

  const testUser = {
    email: generateRandomEmail,
    password: 'validPassword',
  }

  before(() => {
    createUser({
      email: generateRandomEmail,
      password: testUser.password
    })
      .then((response) => {
        expect(response.status).to.eq(201)
        userId = response.body._id
      })
  })

  after(() => {
    if (userId) {
      deleteUser(userId, {
        failOnStatusCode: false
      })
    }
  })

  it('should login with valid credentials', () => {
    login(testUser).then((response) => {
      expect(response.status).to.equal(200)
      expect(response.body).to.have.property('authorization')
      expect(response.body.authorization).to.be.a('string')
    })
  })
})
