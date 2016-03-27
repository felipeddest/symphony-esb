
export {
  create
}

// Assign

function create (opt) {
  return (context) => {
    return new Promise((resolve, reject) => {
      opt.forEach((assign) => {
        assignValue(assign['var'], assign['value'], context.variables)
      })
      resolve()
    })
  }
}

function assignValue (requiredVar, value, root, originalRoot) {
  if (typeof originalRoot === 'undefined') {
    originalRoot = root
  }
  if (requiredVar.indexOf('.') === -1) {
    root[requiredVar] = value
    return originalRoot
  } else {
    let actualVar = requiredVar.substring(0, requiredVar.indexOf('.'))
    let nextVar = requiredVar.substring(requiredVar.indexOf('.') + 1, requiredVar.length)
    root[actualVar] = createIfNotExists(root[actualVar])
    return assignValue(nextVar, value, root[actualVar], originalRoot)
  }
}

function createIfNotExists (variable) {
  if (typeof variable === 'undefined') {
    variable = {}
  }
  return variable
}
