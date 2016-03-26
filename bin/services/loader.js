
import dir from 'node-dir'
import defaults from 'lodash/defaults'

export {
  loadServices
}

function loadServices () {
  const path = process.env.SERVICES_PATH || process.env.NODE_PATH + '/samples/'
  return new Promise((resolve, reject) => {
    let services = []
    dir.readFiles(path, {
      match: /.json$/,
      exclude: /^\./
    }, (err, content, next) => {
      if (err) reject(err)
      // FIXME: needs to validate the service before load
      services.push(defaults(JSON.parse(content), serviceDefaults()))
      next()
    }, (err, files) => {
      if (err) reject(err)
      resolve(services)
    })
  })
}

function serviceDefaults() {
  return {
    "methods": ["GET", "POST", "DELETE", "PUT", "PATCH"]
  }
}
