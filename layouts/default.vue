<template lang="pug">
  div
    nav-bar
    .content-wrapper
      .container-fluid
        nuxt
</template>

<style>
</style>

<script>
import NavBar from '@/components/NavBar'

export default {
  head: {
    bodyAttrs: {
      class: 'page-top fixed-nav sticky-footer bg-dark'
    }
  },
  components: {
    NavBar
  }
}
</script>
