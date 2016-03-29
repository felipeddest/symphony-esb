
import * as needle from 'needle'
import * as util from '../../commons/util'

export {
  create
}

// Invoke

function create (opt) {
  return (context) => {
    return new Promise((resolve, reject) => {
      // FIXME: change eval to utility method
      const requestBody = eval(`context.variables.${opt.body}`)

      const options = {
        json: opt.json
      }

      needle.request(opt.method, opt.url, requestBody, options, (err, resp) => {
        if (err) {
          reject(err)
        } else {
          util.assignValue(opt.outputVar, resp.body, context.variables)
          resolve()
        }
      })
    })
  }
}
