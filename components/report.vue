<template lang="html">
  <div class="wrapper">
    <button @click="openModal">日報を書く</button>
    <modal v-if="modalOpen" @close="closeModal">
      <form @submit.prevent="done">
        <p>日報を書く</p>
        <div>
          <span>投稿者：</span>
          <input
            v-model="contributor"
            class="input"
            type="text"
            placeholder="投稿者名"
          />
        </div>
        <div>
          <span>channel：</span>
          <select v-model="channel">
            <option>01-bot_test</option>
            <option>general</option>
            <option>random</option>
          </select>
        </div>
        <textarea
          v-model="text"
          name="text"
          rows="10"
          cols="70"
          class="input-area"
        >
        </textarea>
        <input type="submit" value="投稿する" />
      </form>
    </modal>
  </div>
</template>

<script>
import modal from '~/components/modal'
import { WebClient } from '@slack/web-api'
const token = process.env.SLACK_TOKEN
const web = new WebClient(token)

export default {
  components: {
    modal
  },
  data: () => ({
    modalOpen: false,
    contributor: null,
    channel: '01-bot_test',
    text: null
  }),
  computed: {
    task() {
      return this.$store.state.todos.task
    },
    todos() {
      return this.$store.state.todos.list
    }
  },
  methods: {
    openModal(index) {
      this.modalOpen = true
      this.text = `${this.formatDate()}\n【現在取り組み中の課題】\n${
        this.task ? this.task : ''
      }\n\n【本日完了したタスク】\n${this.doneList()}\n【明日以降のタスク】\n${this.todoList()}\n【感想】`
    },
    closeModal() {
      this.modalOpen = false
    },
    done() {
      const reportDetail = {
        contributor: this.contributor ? this.contributor : '誰かさん',
        channel: this.channel,
        text: this.text
      }
      this.sendRequest(reportDetail)
    },
    async sendRequest(reportDetail) {
      await web.chat.postMessage({
        channel: reportDetail.channel,
        attachments: [
          {
            color: '#36a64f',
            pretext: `${reportDetail.contributor}の投稿`,
            text: reportDetail.text
          }
        ]
      })
      this.modalOpen = null
    },
    formatDate() {
      const date = new Date()
      const y = date.getFullYear()
      const m = date.getMonth() + 1
      const d = date.getDate()
      const day = '日月火水木金土'.charAt(date.getDay())
      return `${y}年${m}月${d}日 (${day})`
    },
    doneList() {
      let text = ''

      this.todos.forEach(value => {
        if (value.done) {
          text += `- ${value.text}\n`
        }
      })
      return text
    },
    todoList() {
      let text = ''

      this.todos.forEach(value => {
        if (!value.done) {
          text += `- ${value.text}\n`
        }
      })
      return text
    }
  }
}
</script>

<style scoped>
.container {
  margin-top: 50px;
}
</style>
