<template>
  <p>Signing off...</p>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  computed: mapGetters(['isAuthenticated']),
  mounted() {
    const unsetToken = require('~/utils/auth').unsetToken
    const logout = require('~/utils/lock').logout
    if (this.isAuthenticated) {
      unsetToken()
      logout()
    }
  }
}
</script>
