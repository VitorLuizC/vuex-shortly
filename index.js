import reconstruct from 'reconstruct'
import set from 'set-value'
import take from 'object-take'
import assign from 'object-assign'

const resolve = (value, placeholder) => typeof value === 'function' ? value : placeholder;

export const shortlyGetters = (getters = {}) =>
  reconstruct(getters, (property, action) => ({
    [action]: resolve(property, (state) => take(state, property))
  })
)

export const shortlyMutations = (mutations = {}) => reconstruct(mutations,
  (property, action) => ({
    [action]: resolve(property, (state, payload) => set(state, property, payload))
  })
)

export const shortlyActions = (actions = {}) => reconstruct(actions,
  (property, action) => ({
    [action]: resolve(property, ({ commit }, payload) => commit(property, payload))
  })
)

export default (store = {}) => assign({}, store, {
  actions: shortlyActions(store.actions),
  getters: shortlyGetters(store.getters),
  mutations: shortlyMutations(store.mutations),
})
