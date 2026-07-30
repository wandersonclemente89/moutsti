import { login } from '../../support/actions/login.actions'
import {
    clickListProducts,
    createProductByUi,
    deleteProductByName,
    shouldNotSeeProductInList
} from '../../support/actions/product.actions'
import { createUser, deleteUser } from '../../support/api/users.api'
import { createProduct, deleteProduct } from '../../support/api/products.api'

describe('Admin User Flows', () => {
    let userId
    let regularUserId
    let adminToken
    let productId
    let regularUserEmail

    const productName = "Produto Teste"+ Date.now()

    const adminTestUser = {
        email: `admin_${Date.now()}@example.com`,
        password: 'validPassword',
    }


    before(() => {
        createUser({
            nome: 'AdminTest User',
            email: adminTestUser.email,
            password: adminTestUser.password,
            administrador: 'true'
        })
        .then((response) => {
            expect(response.status).to.eq(201)
            userId = response.body._id
        })
        .then(() => {
            return cy.loginByApi(adminTestUser)
        })
        .then((response) => {
            expect(response.status).to.eq(200)
            expect(response.body).to.have.property('authorization')
            adminToken = response.body.authorization
            return createProduct(adminToken, {
                nome: productName,
                preco: 100,
                descricao: "Descrição do produto teste",
                quantidade: 10
            })
        })
        .then((response) => {
            expect(response.status).to.eq(201)
            productId = response.body._id
            
        })
    })

    after(() => {
        if (productId) {
            deleteProduct(adminToken, productId)
        }
        if (userId) {
            deleteUser(userId)
        }
    })

    beforeEach(() => {
        cy.visit('/login')
        login(adminTestUser.email, adminTestUser.password)
    })
    
    it('should be able to search for a product and delete it', () => {
       clickListProducts()
       deleteProductByName(productName)
       shouldNotSeeProductInList(productName)
    })

    it('should allow a user to add a new product', () => {
        cy.intercept({
            url: '/produtos',
            method: 'POST',
        }).as('createProduct')

        createProductByUi({
            nome: `Novo Produto ${Date.now()}`,
            preco: 50,
            descricao: 'Descrição do novo produto',
            quantidade: 5
        })

        cy.wait('@createProduct').then((interception) => {
            expect(interception.response.statusCode).to.eq(201)
            expect(interception.response.body).to.have.property('_id')
            return interception.response.body._id
        }).then((id) => {
            deleteProduct(adminToken, id)
        })
    })
    
})
