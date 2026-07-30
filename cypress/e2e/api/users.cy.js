import {
  createUser,
  deleteUser
} from '../../support/api/users.api'
import { login } from './../../support/api/auth.api'
describe("User API Tests", () => {
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
    if (userId) {
      deleteUser(userId, {
        failOnStatusCode: false
      })
    }
  })

  it("Should not allow duplicate email registration", () => {
    createUser(
      { email: email, password: "password456" },
      { failOnStatusCode: false },
    ).then((response) => {
      expect(response.status).to.eq(400);
      expect(response.body.message).to.eq("Este email já está sendo usado");
    });
  });

});         