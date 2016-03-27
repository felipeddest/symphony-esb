
import * as assign from './step/assign'
import * as invoke from './step/invoke'

export {
  createPipeline
}

function createPipeline (pipeline) {
  let steps = prepareSteps(pipeline)

  return async function (request, reply) {
    for(let step in steps) {
      await steps[step](request, reply)
    }
    reply('OK')
  }
}

function prepareSteps(pipeline) {
  let steps = []
  for (let property in pipeline) {
    if (pipeline.hasOwnProperty(property)) {
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
