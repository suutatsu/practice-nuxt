import { Mutation, VuexModule, getModule, Module } from 'vuex-module-decorators'
import store from '@/store/store' // デコレータでstoreを指定するためimportする必要あり
import { Todo } from '~/types'

// state's interface
export interface ITodoState {
  list: Todo[]
  task: string
}

@Module({ dynamic: true, store, name: 'todo', namespaced: true })
class Todos extends VuexModule implements ITodoState {
  // state
  list: Todo[] = []
  task: string = ''

  // mutation
  @Mutation
  public ADD_TODO(todo: Todo): void {
    this.list.push(todo)
  }

  @Mutation
  public ADD_TASK(task: string): void {
    this.task = task
  }

  @Mutation
  public TOGGLE(list: Todo): void {
    list.done = !list.done
  }

  @Mutation
  public REMOVE(index: number): void {
    this.list = this.list.filter(n => n !== this.list[index])
  }

  @Mutation
  public ALL_REMOVE(): void {
    this.list = []
  }
}

export const todoModule = getModule(Todos)
