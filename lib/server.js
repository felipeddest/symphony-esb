
import Hapi from 'hapi'

import creator from './services/creator'

const server = new Hapi.Server()

export default server

server.connection({ port: 3000 })

server.register({
  register: require('hapi-router'),
  options: {
    routes: '**/*routes.js',
    ignore: 'node_modules/**'
  }
}, {
  routes: {prefix: '/v1'}
}, (err) => {
  if (err) throw err
})

server.start((err) => {
  if (err) {
    console.error(err)
    throw err
  }
  creator(server)
  console.log('Server running at:', server.info.uri)
})
