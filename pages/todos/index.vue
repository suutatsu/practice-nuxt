<template>
  <ul>
    <li>Count:{{ counter }}</li>
    <li v-for="todo in todos" :key="todo">
      <input type="checkbox" :checked="todo.done" @change="toggle(todo)" />
      <span :class="{ done: todo.done }">{{ todo.text }}</span>
    </li>
    <li>
      <input placeholder="What needs to be done?" @keyup.enter="addTodo" />
    </li>
    <li>
      <button @click="removeTodo(todo)">削除</button>
    </li>
  </ul>
</template>

<script>
import { mapMutations } from 'vuex'

export default {
  computed: {
    todos() {
      return this.$store.state.todos.list
    },
    counter() {
      return this.$store.state.counter
    }
  },
  methods: {
    addTodo(e) {
      this.$store.commit('todos/add', e.target.value)
      this.$store.commit('increment')
      e.target.value = ''
    },
    removeTodo() {
      this.$store.commit('todos/remove', this.$store.state.todos.list)
      this.$store.commit('decrement')
    },
    ...mapMutations({
      toggle: 'todos/toggle'
    })
  }
}
</script>

<style>
.done {
  text-decoration: line-through;
}
</style>
