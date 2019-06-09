<template>
  <section class="container">
    <div>
      <h1 class="title">Practis-Todo</h1>
    </div>
    <todo />
    <todoList />
  </section>
</template>

<script>
import todo from '~/components/todo'
import todoList from '~/components/todoList'

export default {
  components: {
    todo,
    todoList
  },
  head() {
    return {
      title: 'practis-todo'
    }
  }
}
</script>

<style scoped>
.container {
  text-align: center;
  padding: 100px 0 0;
  width: 700px;
  margin: 0 auto;
}
</style>
