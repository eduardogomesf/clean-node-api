import paths from './paths'
import components from './components'
import schemas from './schemas'

export default {
  openapi: '3.0.0',
  info: {
    title: 'Enquetes para Programadores',
    description: 'API de enquete criada utilizando Node JS, TDD, DDD e Clean Architecture',
    version: '1.0.0',
    contact: {
      name: 'Eduardo Gomes',
      email: 'eduardo.gomes.fsd@gmail.com',
      url: 'https://www.linkedin.com/in/eduardogomesf'
    }
  },
  externalDocs: {
    description: 'Link para o treinamento completo',
    url: 'https://www.udemy.com/course/tdd-com-mango/?referralCode=B53CE5CA2B9AFA5A6FA1'
  },
  servers: [{
    url: '/api',
    description: 'Servidor Principal'
  }],
  tags: [{
    name: 'Login',
    description: 'APIs relacionadas a Login'
  }, {
    name: 'Enquete',
    description: 'APIs relacionadas a Enquete'
  }],
  paths,
  schemas,
  components
}
