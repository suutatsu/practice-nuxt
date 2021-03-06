<template>
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
        ></textarea>
        <input type="submit" value="投稿する" />
      </form>
    </modal>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import modal from '~/components/modal.vue'
import { WebClient } from '@slack/web-api'
import { todoModule } from '~/store/modules/todo'
import { Todo } from '~/types'
const token = process.env.SLACK_TOKEN
const web = new WebClient(token)

interface REPORT {
  contributor: string
  channel: string
  text: string
}

@Component({
  components: {
    modal
  }
})
export default class extends Vue {
  modalOpen: boolean = false
  contributor: string = ''
  channel: string = '01-bot_test'
  text: string = ''

  private get task(): string {
    return todoModule.task
  }
  private get todos(): Todo[] {
    return todoModule.list
  }

  private openModal(): void {
    this.modalOpen = true
    this.text = `${this.formatDate()}\n【現在取り組み中の課題】\n${
      this.task ? this.task : ''
    }\n\n【本日完了したタスク】\n${this.doneList()}\n【明日以降のタスク】\n${this.todoList()}\n【感想】`
  }

  private closeModal(): void {
    this.modalOpen = false
  }

  private done(): void {
    const reportDetail: REPORT = {
      contributor: this.contributor ? this.contributor : '誰かさん',
      channel: this.channel,
      text: this.text
    }
    this.sendRequest(reportDetail)
  }

  private async sendRequest(reportDetail: REPORT): Promise<void> {
    await web.chat.postMessage({
      text: 'こちら',
      channel: 'C012345',
      attachments: [
        {
          color: '#36a64f',
          pretext: `${reportDetail.contributor}の投稿`,
          text: reportDetail.text
        }
      ]
    })
    this.modalOpen = false
  }

  private formatDate(): string {
    const date: Date = new Date()
    const y: number = date.getFullYear()
    const m: number = date.getMonth() + 1
    const d: number = date.getDate()
    const day: number = '日月火水木金土'.charAt(date.getDay())
    return `${y}年${m}月${d}日 (${day})`
  }

  private doneList(): string {
    let text: string = ''

    this.todos.map(
      (value): void => {
        if (value.done) {
          text += `- ${value.text}\n`
        }
      }
    )
    return text
  }

  private todoList(): string {
    let text: string = ''

    this.todos.map(
      (value): void => {
        if (!value.done) {
          text += `- ${value.text}\n`
        }
      }
    )
    return text
  }
}
</script>

<style scoped>
.container {
  margin-top: 50px;
}
</style>
