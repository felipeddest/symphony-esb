
export {
  create
}

// Reply

function create(opt) {
   return (context) => {
    return new Promise((resolve, reject) => {
      if (opt.value) {
        context.res(opt.value)
      } else {
        context.res(eval(`context.variables.${opt.expression}`))
      }
      resolve()
    })
  }
}