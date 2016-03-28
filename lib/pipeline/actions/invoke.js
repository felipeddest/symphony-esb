
import * as needle from 'needle'
import * as util from '../../commons/util'

export {
  create
}

// Invoke

function create (opt) {
  return (context) => {
    return new Promise((resolve, reject) => {
      let invoke = getInvokeFunction(opt.method)

      invoke(opt.url, eval(`context.variables.${opt.body}`), (err, resp) => {
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

function getInvokeFunction(method) {
  if (method === 'POST') {
    return needle.post
  } else if (method === 'GET') {
    return needle.get
  } else if (method === 'PATCH') {
    return needle.patch
  } else if (method === 'PUT') {
    return needle.put
  } else if (method === 'DELETE') {
    return needle.delete
  }
}
