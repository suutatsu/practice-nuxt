export const state = () => ({
  list: []
})

export const mutations = {
  add(state, todo) {
    state.list.push({
      text: todo.todo,
      done: todo.done
    })
  },
  toggle(state, todo) {
    todo.done = !todo.done
  },
  remove(state, index) {
    state.list = state.list.filter(n => n !== state.list[index])
  },
  allRemove(state) {
    state.list = []
  }
}
