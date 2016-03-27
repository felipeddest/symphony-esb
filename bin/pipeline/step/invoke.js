
export {
  create
}

// Invoke

function create(opt) {
  return (request, reply) => {
    return new Promise((resolve, reject) => {
      console.log('running invoke')
      setTimeout(() => {
        console.log('finish invoke')
        resolve()
      }, 1000)
    })
  }
}