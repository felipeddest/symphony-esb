'use strict'

import Hapi from 'hapi'
import * as ServiceCreator from './services/creator'

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

server.start(function (err) {
  if (err) {
    console.log(err)
    throw err
  }
  ServiceCreator.createServices(server)
  console.log('Server running at:', server.info.uri)
})

export default server
