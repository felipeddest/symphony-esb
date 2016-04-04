export default function assignValue (requiredVar, value, root, originalRoot) {
  if (typeof originalRoot === 'undefined') {
    originalRoot = root
  }

  if (requiredVar.indexOf('.') === -1) {
    root[requiredVar] = value
    return originalRoot
  }

  const actualVar = requiredVar.substring(0, requiredVar.indexOf('.'))
  const nextVar = requiredVar.substring(requiredVar.indexOf('.') + 1, requiredVar.length)
  root[actualVar] = root[actualVar] || {}
  return assignValue(nextVar, value, root[actualVar], originalRoot)
}
