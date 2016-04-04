import { request } from 'needle'

import assignValue from '../commons/assign-value'

export function assign (options) {
  return async (ctx) => {
    await Promise.all(options.map((assign) => {
      if(assign.transformationFile) {
        const input = eval(`ctx.variables.${assign.transformationFile.input}`)
        const path = `${ctx.serviceDir}${assign.transformationFile.path}`
        const result = require(path).transform(input)
        assignValue(assign.var, result, ctx.variables)
      } else {
        const value = assign.value || eval(`ctx.variables.${assign.expression}`)
        assignValue(assign.var, value, ctx.variables)
      }
    }))
  }
}

export function invoke (options) {
  return (ctx) => {
    return new Promise((resolve, reject) => {
      const body = eval(`ctx.variables.${options.body}`)
      request(options.method, options.url, body, {
        json: options.json
      }, (err, res) => {
        if (err) return reject(err)
        assignValue(options.outputVar, res.body, ctx.variables)
        resolve()
      })
    })
  }
}

export function reply (options) {
  return (ctx) => {
    return new Promise((resolve, reject) => {
      try {
        ctx.res(options.value
          ? options.value
          : eval(`ctx.variables.${options.expression}`)
        )
        resolve()
      } catch (err) {
        reject(err)
      }
    })
  }
}
