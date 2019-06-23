import Vue from 'vue'
import Vuex from 'vuex'
import { ITodoState } from '@/store/modules/todo'
Vue.use(Vuex)

export interface State {
  list: ITodoState
  task: string
}
export default new Vuex.Store<State>({})
