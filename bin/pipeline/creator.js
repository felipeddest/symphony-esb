
export {
  createPipeline
}

function createPipeline (pipeline) {
  let pipelineFunctions = []
  for (let property in pipeline) {
    if (pipeline.hasOwnProperty(property)) {
      pipelineFunctions.push(function (request, reply) {
        return new Promise((resolve, reject) => {
          console.log('running step ' + property)
          if(property.startsWith('invoke')) {
            console.log('invoke step')
            setTimeout(() => {
              console.log('finish invoke')
              resolve()
            }, 1000)
          } else {
            resolve()
          }
        })
      })
    }
  }

  return async function (request, reply) {
    for(let func in pipelineFunctions) {
      await pipelineFunctions[func](request, reply)
    }
    reply('OK')
  }
}

