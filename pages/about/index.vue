<template>
  <NuxtLink to="/">{{ name }}</NuxtLink>
</template>

<script>
export default {
  asyncData(context) {
    return {
      name: process.static ? 'static' : process.server ? 'server' : 'client'
    }
  },
  transition: 'about'
}
</script>
