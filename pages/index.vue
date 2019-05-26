<template>
  <section class="container">
    <div>
      <logo />
      <h1 class="title">practice-nuxt</h1>
      <nuxt-link to="/about">About page</nuxt-link>
      <h2 class="subtitle">My splendiferous Nuxt.js project</h2>
      <div class="links">
        <nuxt-link
          v-for="post in posts"
          :key="post.id"
          :to="{ name: 'post-id', params: { id: post.id } }"
          class="button--gray"
        >
          {{ post.title }}
        </nuxt-link>
      </div>
    </div>
  </section>
</template>

<script>
import Logo from '~/components/Logo.vue'
export default {
  components: {
    Logo
  },
  head() {
    return {
      title: 'Home Page 🍕',
      meta: [
        { name: 'twitter:title', content: 'Nuxt Fundamentals by Vue school' },
        { name: 'twitter:description', content: 'Nuxt + Vue = 🍕' },
        { name: 'twitter:image', content: 'https://i.imgur.com/UYP2umJ.png' },
        { name: 'twitter:card', content: 'sammary_large_image' }
      ]
    }
  },
  computed: {
    posts() {
      return this.$store.state.posts.all
    }
  }
}
</script>

<style>
.container {
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}
.title {
  font-family: 'Quicksand', 'Source Sans Pro', -apple-system, BlinkMacSystemFont,
    'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  display: block;
  font-weight: 300;
  font-size: 100px;
  color: #35495e;
  letter-spacing: 1px;
}
.subtitle {
  font-weight: 300;
  font-size: 42px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}
.links {
  padding-top: 15px;
}
</style>
