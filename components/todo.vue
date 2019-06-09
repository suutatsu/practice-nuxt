<template lang="html">
  <div class="wrapper">
    <h2>現在取り組んでいるタスク：</h2>
    <span v-if="tasks">{{ tasks }}</span>
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
    <input
      v-model="todo"
      class="input"
      type="text"
      placeholder="新しいタスク"
      required
    />
    <input type="submit" value="追加する" />
  </div>
</template>

<script>
import modal from '~/components/modal'

export default {
  components: {
    modal
  },
  data: () => ({
    todo: null,
    day: '無し',
    task: null,
    modalOpen: false
  }),
  computed: {
    tasks() {
      return this.$store.state.todos.task
    }
  },
  methods: {
    onSubmit() {
      const productTodo = {
        todo: this.todo,
        day: this.day,
        done: false
      }
      this.todo = null
      this.addTodo(productTodo)
    },
    addTodo(todo) {
      this.$store.commit('todos/add', todo)
    },
    addTask() {
      this.$store.commit('todos/addTask', this.task)
      this.modalOpen = false
    },
    closeModal() {
      this.modalOpen = false
    }
  }
}
</script>

<style scoped>
.wrapper {
  margin-top: 50px;
}
</style>
