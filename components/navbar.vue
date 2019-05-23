<template>
  <nav class="nav">
    <div class="logo">
      <a href="#" class="logo">NUXT Fandamentails</a>
      <span class="subheader">A VUE school course</span>
    </div>
  </nav>
</template>

<script>
export default {}
</script>

<style scoped>
nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 70px;
  letter-spacing: 0.5px;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 1;
}

.nav .logo .subheader {
  opacity: 0.5;
  font-size: 0.9rem;
  color: #000;
}

.nav .nav-content {
  font-size: 1rem;
}

.nav-content ul {
  display: flex;
  list-style: none;
}

.nav-content ul li {
  padding: 2px 10px;
}

.nav-content ul li:not(:first-of-type) {
  border-left: 1px solid #000;
}
</style>
