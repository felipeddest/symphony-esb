'use strict'

import Hapi from 'hapi'

const server = new Hapi.Server()

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
    throw err
  }
  console.log('Server running at:', server.info.uri)
})

export default server
