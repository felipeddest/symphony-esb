import {
  assign,
  invoke,
  reply
} from './actions'

export default (pipeline) => {
  const actions = getActions(pipeline)

  return async (request, reply) => {
    try {
      const ctx = buildContext(request, reply)
      await Promise.all(actions.map((action) => action(ctx)))
    } catch (err) {
      console.error(err)
      reply(JSON.stringify(err))
    }
    console.log(context.variables)
  }
}

function buildContext (request, reply) {
  return {
    variables: {
      req: {
        query: request.url.query,
        payload: request.payload
      },
    },
    res: reply
  }
}

function getActions (pipeline) {
  const actions = []
  for (const prop in pipeline) {
    if (pipeline.hasOwnProperty(prop) && prop !== 'declarations') {
      actions.push(createAction(prop, pipeline[prop]))
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
