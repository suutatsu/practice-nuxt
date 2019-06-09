<template lang="html">
  <div class="wrapper">
    <div class="heading-label">
      <span>タスク</span>
      <span>期限日</span>
      <span>状態</span>
      <span>削除</span>
    </div>
    <div>
      <div class="head-label">
        <ul id="sortable" class="ui-sortable">
          <li v-for="(todo, index) in todos" :key="index">
            <span>{{ todo.text }}</span>
            <span>{{ todo.day }}</span>
            <input
              type="checkbox"
              :checked="todo.done"
              @change="toggle(todo)"
            />
            <button @click="remove(index)">削除</button>
          </li>
        </ul>
      </div>
      <div class="all-delete-button-container">
        <button
          type="button"
          class="el-button all-delete-button el-button--danger"
          @click="allRemove"
        >
          <span>タスクをすべて削除する</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'

export default {
  computed: {
    todos() {
      return this.$store.state.todos.list
    }
  },
  methods: {
    modalOpen(index) {
      this.$refs[`modal- ${index}`].show()
    },
    ...mapMutations({
      toggle: 'todos/toggle',
      remove: 'todos/remove',
      allRemove: 'todos/allRemove'
    })
  }
}
</script>

<style scoped>
.container {
  margin-top: 50px;
}
</style>
