export function createProduct(token, product = {}, options = {}) {
  const body = {
    nome: product.nome ?? `Produto Teste ${Date.now()}`,
    preco: product.preco ?? 100,
    descricao: product.descricao ?? 'Produto automatizado',
    quantidade: product.quantidade ?? 10
  }

  return cy.request({
    method: 'POST',
    url: `${cy.config('apiUrl')}/produtos`,
    headers: {
      authorization: token
    },
    body,
    ...options
  })
}

export function deleteProduct(token, productId, options = {}) {
  return cy.request({
    method: 'DELETE',
    url: `${cy.config('apiUrl')}/produtos/${productId}`,
    headers: {
      authorization: token
    },
    ...options
  })
}