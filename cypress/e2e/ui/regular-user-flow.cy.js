import { login } from '../../support/actions/login.actions'
import {
    addProductToShoppingList,
    clearShoppingList,
    openProductDetailsById,
    openProductDetailsFromSearch,
    searchProduct,
    shouldSeeEmptyShoppingList,
    shouldSeeProductDetails,
    shouldSeeShoppingListProduct
} from '../../support/actions/product.actions'
import { createUser, deleteUser } from '../../support/api/users.api'
import { createProduct, deleteProduct } from '../../support/api/products.api'

describe('Regular User Flows', () => {
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

    const regularTestUser = {
        email: `regular_${Date.now()}@example.com`,
        password: 'validRegularPassword',
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
        .then(() => {
            createUser({
                nome: 'Regular User',
                email: regularTestUser.email,
                password: regularTestUser.password,
                administrador: 'false'
            })
            .then((response) => {
                expect(response.status).to.eq(201)
                regularUserId = response.body._id
                regularUserEmail = response.body.email
            })
        })
    })

    after(() => {
        if (productId) {
            deleteProduct(adminToken, productId)
        }
        if (userId) {
            deleteUser(userId)
        }
        if (regularUserId) {
            deleteUser(regularUserId)
        }
    })

    beforeEach(() => {
        cy.visit('/login')
        login(regularTestUser.email, regularTestUser.password)
    })
    it('should be able to search for a product and see its details', () => {
        searchProduct(productName)
        openProductDetailsFromSearch(productId)
        shouldSeeProductDetails(productName)
    })

    it('should allow a user to add a product to a shopping cart and clear it', () => {
        openProductDetailsById(productId)
        shouldSeeProductDetails(productName)
        addProductToShoppingList()
        shouldSeeShoppingListProduct(productName)
        clearShoppingList()
        shouldSeeEmptyShoppingList()
    })
    
})
