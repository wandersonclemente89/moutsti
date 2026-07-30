export function clickRegisterProducts() {
  cy.getByTestId('cadastrar-produtos').click()
}

export function clickListProducts() {
  cy.getByTestId('listar-produtos').click()
}

export function getProductRowByName(name) {
  return cy.get('.table-striped').contains('tr', name)
}

export function deleteProductByName(name) {
  getProductRowByName(name)
    .within(() => {
      cy.contains('button', 'Excluir').click()
    })
}

export function shouldNotSeeProductInList(name) {
  cy.get('.table-striped')
    .contains('tr', name)
    .should('not.exist')
}

export function searchProduct(name) {
  cy.getByTestId('pesquisar').clear().type(name)
  cy.getByTestId('botaoPesquisar').click()
}

export function getProductDetailLinkById(productId) {
  return cy.getByTestId('product-detail-link')
    .filter(`[href*="${productId}"]`)
    .should('have.length', 1)
}

export function openProductDetailsById(productId) {
  getProductDetailLinkById(productId).click()
}

export function openProductDetailsFromSearch(productId) {
  getProductDetailLinkById(productId)
    .contains('Detalhes')
    .should('be.visible')
    .click()
}

export function shouldSeeProductDetails(name) {
  cy.get('h1')
    .contains('Detalhes do produto')
    .should('be.visible')
  cy.getByTestId('product-detail-name')
    .contains(name)
    .should('be.visible')
}

export function addProductToShoppingList() {
  cy.getByTestId('adicionarNaLista').click()
}

export function shouldSeeShoppingListProduct(name) {
  cy.contains('Lista de Compras').should('be.visible')
  cy.getByTestId('shopping-cart-product-name')
    .contains(name)
    .should('be.visible')
}

export function clearShoppingList() {
  cy.getByTestId('limparLista').click()
}

export function shouldSeeEmptyShoppingList() {
  cy.getByTestId('shopping-cart-empty-message')
    .should('be.visible')
    .contains('Seu carrinho está vazio')
}

export function fillProductName(name) {
  cy.getByTestId('nome').clear().type(name)
}

export function fillProductPrice(price) {
  cy.getByTestId('preco').clear().type(String(price))
}

export function fillProductDescription(description) {
  cy.getByTestId('descricao').clear().type(description)
}

export function fillProductQuantity(quantity) {
  cy.getByTestId('quantity').clear().type(String(quantity))
}

export function clickCreateProduct() {
  cy.getByTestId('cadastarProdutos').click()
}

export function createProductByUi(product = {}) {
  const productData = {
    nome: product.nome ?? `Novo Produto ${Date.now()}`,
    preco: product.preco ?? 50,
    descricao: product.descricao ?? 'Descrição do novo produto',
    quantidade: product.quantidade ?? 5
  }

  clickRegisterProducts()
  fillProductName(productData.nome)
  fillProductPrice(productData.preco)
  fillProductDescription(productData.descricao)
  fillProductQuantity(productData.quantidade)
  clickCreateProduct()

  return productData
}
