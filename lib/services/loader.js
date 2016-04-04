import dir from 'node-dir'
import defaults from 'lodash/defaults'

const path = process.env.SERVICES_PATH || process.env.NODE_PATH + '/samples/'

export default () => {
  const services = []
  return new Promise((resolve, reject) => {
    dir.readFiles(path, {
      match: /.json$/,
      exclude: /^\./
    }, (err, content, next) => {
      if (err) reject(err)
      // FIXME: needs to validate the service before load
      services.push(defaults(JSON.parse(content), {
        methods: ['GET', 'POST', 'DELETE', 'PUT', 'PATCH']
      }))

      next()
    }, (err, files) => {
      if (err) return reject(err)
      resolve(services)
    })
  })
}
