<template lang="html">
  <div class="wrapper">
    <h2>現在取り組んでいるタスク：</h2>
    <span>{{ task }}</span>
    <button @click="modalOpen = true">追加・変更</button>
    <modal v-if="modalOpen" @close="closeModal">
      <p>現在取り組んでいるタスクを入力してください</p>
      <form ref="form" @submit.prevent="addTask">
        <input
          v-model="task"
          class="input"
          type="text"
          placeholder="新しいタスク"
        />
        <input type="submit" value="追加・変更する" />
      </form>
    </modal>
    <h2>タスクを入力してください</h2>
    <span>
      <Datetime
        v-model="day"
        :format="'YYYY-MM-DD'"
        :disabled-hours="[
          '00',
          '01',
          '02',
          '03',
          '04',
          '05',
          '06',
          '07',
          '08',
          '17',
          '18',
          '19',
          '20',
          '21',
          '22',
          '23'
        ]"
        :overlay="true"
        :only-date="true"
        :first-day-of-week="1"
      ></Datetime>
    </span>
    <form @submit.prevent="onSubmit">
      <input
        v-model="todo"
        class="input"
        type="text"
        placeholder="新しいタスク"
        required
      />
      <input type="submit" value="追加する" />
    </form>
    <todoList />
    <report />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import Datetime from 'vue-ctk-date-time-picker'
import '@/node_modules/vue-ctk-date-time-picker/dist/vue-ctk-date-time-picker.css'
import modal from '~/components/modal.vue'
import todoList from '~/components/todoList.vue'
import report from '~/components/report.vue'
import { todoModule } from '~/store/modules/todo'
import { Todo } from '~/types'

@Component({
  components: {
    modal,
    todoList,
    report,
    Datetime
  }
})
export default class extends Vue {
  todo: string = ''
  day: string = ''
  task: string = ''
  modalOpen: boolean = false

  private addTodo(todo): void {
    todoModule.ADD_TODO(todo)
  }

  private addTask(): void {
    todoModule.ADD_TASK(this.task)
    this.modalOpen = false
  }

  private closeModal(): void {
    this.modalOpen = false
  }

  private onSubmit(): void {
    const productTodo: Todo = {
      text: this.todo,
      day: this.day,
      done: false
    }
    this.todo = ''
    this.day = ''
    this.addTodo(productTodo)
  }
}
</script>

<style scoped>
.wrapper {
  margin-top: 50px;
}
</style>
