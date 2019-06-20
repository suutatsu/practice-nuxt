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
            <button @click="openModal(index)">削除</button>
          </li>
          <modal v-if="modalOpen" @close="closeModal">
            <p>本当に削除しますか？</p>
            <button @click="remove(index)">
              削除
            </button>
          </modal>
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

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import { mapMutations } from 'vuex'
import modal from '~/components/modal'

@Component({
  components: {
    modal
  },
  methods: {
    ...mapMutations({
    toggle: 'todos/toggle',
    remove: 'todos/remove',
    allRemove: 'todos/allRemove'
    })
  }
})
export default class extends Vue {
  modalOpen: boolean = false
  todoIndex: number = 0

  private get todos(): Object[] {
    return this.$store.state.todos.list
  }

  openModal(index: number): void {
    this.modalOpen = true
    this.todoIndex = index
  }

  closeModal(): void {
    this.modalOpen = false
  }
}
</script>

<style scoped>
.container {
  margin-top: 50px;
}
</style>
