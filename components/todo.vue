<template lang="html">
  <div class="wrapper">
    <h2>現在取り組んでいるタスク：</h2>

    <button>追加・変更</button>
    <h2>タスクを入力してください</h2>
    <form @submit.prevent="onSubmit">
      <input
        v-model="todo"
        class="input"
        type="text"
        placeholder="新しいタスク"
      />
      <input type="submit" value="追加する" />
    </form>
  </div>
</template>

<script>
export default {
  data: () => ({
    todo: null
  }),
  methods: {
    onSubmit() {
      const productTodo = {
        todo: this.todo,
        done: false
      }
      this.todo = null
      this.addTodo(productTodo)
    },
    addTodo(todo) {
      this.$store.commit('todos/add', todo)
    }
  }
}
</script>

<style scoped>
.container {
  width: 960px;
  margin: 0 auto;
}
</style>
