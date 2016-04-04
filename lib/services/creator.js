import loader from './loader'
import pipeline from '../pipeline'

export default async (server) => {
  const services = await loader()

  services.map((service) => {
    console.log(`Service: ${service.name} Description: ${service.description}`)
  })

  console.log('Services count:', services.length)

  services.map((service) => {
    service.methods.map((method) => {
      server.route({
        method: method,
        path: service.path,
        handler: pipeline(service)
      })
    })
  })
}
