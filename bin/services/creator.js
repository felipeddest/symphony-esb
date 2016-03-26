

import * as loader from './loader'

export {
  createServices
}

async function createServices(server) {

  const services = await loader.loadServices()

  services.forEach((service) => {
    console.log(`Service: ${service.name} Description: ${service.description}`)
  })
  console.log('Services count:', services.length)

  services.forEach((service) => {
    service.methods.forEach((method) => {
      server.route({
        method: method,
        path: service.path,
        handler: function(request, reply) {
          reply(`Service: ${service.name} Description: ${service.description}`)
        }
      })
    })
  })
}
