import { Todo } from '~/types'

export interface RootState {
  list: Todo[]
  task: string
}
