const shortlyMethods = (λ) => (methods = {}) => {
  const types = Object.keys(methods)
  const shortly = types.reduce((shortly, method) => {
    const handler = methods[method]
    shortly[method] = typeof handler === 'function' ? handler : λ(handler)
    return shortly
  }, Object.create(null))
  return shortly
}

export const shortlyGetters = shortlyMethods((property) => {
  return (state) => state[property]
})

export const shortlyMutations = shortlyMethods((property) => {
  return (state, payload) => {
    state[property] = payload
  }
})

export const shortlyActions = shortlyMethods((type) => {
  return ({ commit }, payload) => commit(type, payload)
})

export default (store = {}) => {
  const shortly = Object.assign({}, store, {
    getters: shortlyGetters(store.getters),
    mutations: shortlyMutations(store.mutations),
    actions: shortlyActions(store.actions)
  })
  return shortly
}
