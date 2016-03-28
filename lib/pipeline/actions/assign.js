
import * as util from '../../commons/util'

export {
  create
}

// Assign

function create (opt) {
  return (context) => {
    return new Promise((resolve, reject) => {
      opt.forEach((assign) => {
        util.assignValue(assign['var'], assign['value'], context.variables)
      })
      resolve()
    })
  }
}
