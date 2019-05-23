<template>
  <div class="container">
    <article>
      <h1 class="title">{{ post.title }}</h1>
      <p>{{ post.content }}</p>
    </article>
  </div>
</template>

<script>
export default {
  data() {
    return {
      id: this.$route.params.id,
      posts: [
        {
          id: 'balut',
          title: 'What is Balut?',
          content: 'サンプルサンプルサンプル'
        },
        {
          id: 'whereisit',
          title: 'Where is the sign in balut?',
          content: 'サンプルサンプル'
        },
        {
          id: 'how',
          title: 'How can I fix this problem?',
          content: 'サンプルサンプルサンプル'
        }
      ]
    }
  },
  computed: {
    post() {
      return this.posts.find(post => post.id === this.id)
    }
  }
}
</script>

<style scoped>
.container {
  display: flex;
  justify-content: space-between;
  line-height: 1.5;
}
article * {
  margin-bottom: 1rem;
}
aside {
  max-width: 280px;
  min-width: 280px;
  padding-left: 2rem;
}
.title {
  font-size: 2rem;
}
</style>
