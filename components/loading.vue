<template lang="html">
  <div v-if="loading" class="loading-page">
    <p>Loading...</p>
  </div>
</template>

<script>
export default {
  data: () => ({
    loading: false
  }),
  mounted() {
    this.$nextTick(() => {
      this.$nuxt.$loading.start()

      setTimeout(() => {
        this.finish()
      }, 2000)
    })
  },
  methods: {
    start() {
      this.loading = true
    },
    finish() {
      this.loading = false
    }
  }
}
</script>

<style scoped>
.loading-page {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(255, 255, 255, 0.8);
  text-align: center;
  padding-top: 200px;
  font-size: 30px;
  font-family: sans-serif;
  z-index: 9999;
}
</style>
