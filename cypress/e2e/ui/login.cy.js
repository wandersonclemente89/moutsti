import { login, shouldSeeError, fillEmail, fillPassword, clickLogin } from '../../support/actions/login.actions'
import { createUser, deleteUser } from '../../support/api/users.api'


describe('Login', () => {
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


  beforeEach(() => {
    cy.visit('/login')
  })

  it('should login successfully', () => {
    login(testUser.email, testUser.password)
    cy.url().should('include', '/home')
  })

  it('should not login with invalid password', () => {
    login(
      testUser.email,
      'invalidPassword'
    )

    shouldSeeError('Email e/ou senha inválidos')
  })

  it('should require email', () => {
    fillPassword('somepassword')
    clickLogin()
    shouldSeeError('Email é obrigatório')
  })

  it('should require password', () => {
    fillEmail(testUser.email)
    clickLogin()
    shouldSeeError('Password é obrigatório')
  })

})