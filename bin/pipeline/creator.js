
export {
  createPipeline
}

function createPipeline (pipeline) {
  let pipelineFunctions = []
  for (let property in pipeline) {
    if (pipeline.hasOwnProperty(property)) {
      pipelineFunctions.push(createStep(property))
    }
  }

  return async function (request, reply) {
    for(let func in pipelineFunctions) {
      await pipelineFunctions[func](request, reply)
    }
    reply('OK')
  }
}

function createStep (property) {
  return (request, reply) => {
    return new Promise((resolve, reject) => {
      console.log('running step ' + property)
      if(property.startsWith('invoke')) {
        setTimeout(() => {
          console.log('finish invoke')
          resolve()
        }, 1000)
      } else {
        resolve()
      }
    })
  }
}
