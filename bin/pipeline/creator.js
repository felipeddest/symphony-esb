
import * as assign from './step/assign'
import * as invoke from './step/invoke'

export {
  createPipeline
}

function createPipeline (pipeline) {
  let steps = prepareSteps(pipeline)

  return async function (request, reply) {
    let variables = {}
    pipeline.declarations.forEach((declaration) => {
      variables[declaration] = {}
    })
    let context = {
      variables: variables,
      req: request,
      res: reply
    }
    for(let i in steps) {
      await steps[i](context)
    }
    reply('OK')
  }
}

function prepareSteps(pipeline) {
  let steps = []
  for (let property in pipeline) {
    if (pipeline.hasOwnProperty(property) && property !== 'declarations') {
      steps.push(createStep(property, pipeline[property]))
    }
  }
  return steps
}

function createStep (type, step) {
  if (type.startsWith('invoke')) {
    return invoke.create(step)
  } else if (type.startsWith('assign')) {
    return assign.create(step)
  }
}
