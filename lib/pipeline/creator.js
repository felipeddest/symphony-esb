
import * as assign from './actions/assign'
import * as invoke from './actions/invoke'
import * as reply from './actions/reply'

export {
  createPipeline
}

function createPipeline (pipeline) {
  let actions = prepareActions(pipeline)

  return async function (request, reply) {
    let context = {
      variables: {},
      req: request,
      res: reply
    }
    try {
      for(let i in actions) {
        await actions[i](context)
      }
    } catch (err) {
      console.error(err)
      reply(JSON.stringify(err))
    }
    console.log(context.variables)
  }
}

function prepareActions(pipeline) {
  let actions = []
  for (let property in pipeline) {
    if (pipeline.hasOwnProperty(property) && property !== 'declarations') {
      actions.push(createAction(property, pipeline[property]))
    }
  }
  return actions
}

function createAction (type, action) {
  if (type.startsWith('invoke')) {
    return invoke.create(action)
  } else if (type.startsWith('assign')) {
    return assign.create(action)
  } else if (type === 'reply') {
    return reply.create(action)
  }
}
