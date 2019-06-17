<template>
  <section class="container">
    <div>
      <h1 class="title">Practis-Todo</h1>
    </div>
    <todo />
  </section>
</template>

<script>
import todo from '~/components/todo'

export default {
  components: {
    todo
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
