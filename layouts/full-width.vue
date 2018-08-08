<template lang="pug">
div
  nav-bar

  modals-container 

  .container-fluid.mt-4
    .row
      .col
        nuxt

</template>

<script>
import NavBar from '@/components/NavBar'
import MapalaMap from '@/components/MapalaMap'

export default {
  head: {
    bodyAttrs: {
      //class: 'page-top fixed-nav sticky-footer bg-dark'
    }
  },
  components: {
    NavBar,
    MapalaMap
  }
}
</script>
