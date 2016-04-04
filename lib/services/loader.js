import dir from 'node-dir'
import defaults from 'lodash/defaults'

const path = process.env.SERVICES_PATH || process.env.NODE_PATH + '/samples/'

export default () => {
  const services = []
  return new Promise((resolve, reject) => {
    dir.readFiles(path, {
      match: /.json$/,
      exclude: /^\./
    }, (err, content, filename, next) => {
      if (err) reject(err)
      let service = defaults(JSON.parse(content), {
        methods: ['GET', 'POST', 'DELETE', 'PUT', 'PATCH']
      })
      service.dir = filename.substring(0, filename.lastIndexOf('/') + 1)
      // FIXME: needs to validate the service before load
      services.push(service)
      next()
    }, (err, files) => {
      if (err) return reject(err)
      resolve(services)
    })
  })
}
