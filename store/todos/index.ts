import { RootState, Todo } from '~/types'
import { MutationTree } from 'vuex'

export const state = (): RootState => ({
  list: [],
  task: ''
})

export const mutations: MutationTree<RootState> = {
  addTodo(state: RootState, todo: Todo): void {
    state.list.push(todo)
  },
  addTask(state: RootState, task: string): void {
    state.task = task
  },
  toggle(state: RootState, todo: Todo): void {
    todo.done = !todo.done
  },
  remove(state: RootState, index: number): void {
    console.log(index)
    state.list = state.list.filter(n => n !== state.list[index])
  },
  allRemove(state: RootState) {
    state.list = []
  }
}
