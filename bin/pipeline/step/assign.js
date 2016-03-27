
export {
  create
}

// Assign

function create(opt) {
  return (request, reply) => {
    return new Promise((resolve, reject) => {
      console.log('running assign')
      resolve()
    })
  }
}