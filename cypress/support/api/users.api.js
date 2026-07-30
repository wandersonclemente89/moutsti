export function createUser(user = {}, options = {}){
  const body = {
    nome: user.nome || 'Usuário Teste',
    email: user.email || `user_${Date.now()}@qa.com.br`,
    password: user.password || 'teste123',
    administrador: user.administrador || 'true'
  }

  return cy.request({
    method: 'POST',
    url: `${cy.config('apiUrl')}/usuarios`,
    body,
    ...options
  })
}

export function deleteUser (userId, options = {}){
  return cy.request({
    method: 'DELETE',
    url: `${cy.config('apiUrl')}/usuarios/${userId}`,
    ...options
  })
}