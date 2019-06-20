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
import modal from '~/components/modal'
import todoList from '~/components/todoList'
import report from '~/components/report'

@Component({
  components: {
    modal,
    todoList,
    report
  }
})
export default class extends Vue {
  todo: String = ''
  day: String = ''
  task: String = ''
  modalOpen: Boolean = false

  addTodo(todo) {
    this.$store.commit('todos/add', todo)
  }

  addTask() {
    this.$store.commit('todos/addTask', this.task)
    this.modalOpen = false
  }

  closeModal() {
    this.modalOpen = false
  }

  onSubmit() {
    const productTodo = {
      todo: this.todo,
      day: this.day,
      done: false
    }
    this.todo = ''
    this.addTodo(productTodo)
  }
}
</script>

<style scoped>
.wrapper {
  margin-top: 50px;
}
</style>
