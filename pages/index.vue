<template>
  <section class="container">
    <div>
      <h1 class="title">Practis-Todo</h1>
    </div>
    <todo />
  </section>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import todo from '~/components/todo'

@Component({
  components: {
    todo
  }
})
export default class extends Vue {}
</script>

<style scoped>
.container {
  text-align: center;
  padding: 100px 0 0;
  width: 700px;
  margin: 0 auto;
}
</style>
