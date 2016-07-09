function chainable(target) {
  let lastValue = undefined

  return new Proxy(target, {
    get(obj, prop) {
      if (prop in obj && typeof obj[prop] === 'function') {
        return new Proxy(obj[prop], {
          apply(t, thisArg, args) {
            const fn = t.bind(target)

            if (args.length > 0) {
              lastValue = fn(...args)
            }
            else {
              lastValue = fn(lastValue)
            }

            return thisArg
          }
        })
      }

      return obj[prop]
    }
  })
}

module.exports = chainable
