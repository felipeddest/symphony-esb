
import * as util from '../../commons/util'

export {
  create
}

// Assign

function create (opt) {
  return (context) => {
    return new Promise((resolve, reject) => {
      opt.forEach((assign) => {
        let value
        if (assign['value']) {
          value = assign['value']
        } else {
          value = eval(`context.variables.${assign.expression}`)
        }
        util.assignValue(assign['var'], value, context.variables)
      })
      resolve()
    })
  }
}
