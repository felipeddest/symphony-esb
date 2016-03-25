'use strict'

import Hapi from 'hapi'
import * as loader from '../api/services/loader'

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

server.start(async function (err) {
  if (err) {
    console.log(err)
    throw err
  }
  let services = await loader.loadServices()
  services.forEach((service) => {
    console.log(`Service: ${service.name} Description: ${service.description}`)
  })
  console.log('Services count:', services.length)
  console.log('Server running at:', server.info.uri)
})

export default server
