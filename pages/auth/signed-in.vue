<template>
  <p>Signing in...</p>
</template>

<script>
import { setToken, extractInfoFromHash } from '~/utils/auth'
export default {
  mounted() {
    const { token } = extractInfoFromHash()
    setToken(token)
    this.$router.replace('/')
  }
}
</script>
