<template lang="pug">
div
  nav-bar

  modals-container 

  .container-fluid.mt-4
    .row
      .col-md-4
        nuxt
      .col.right-fixed-container
        mapala-map#map


</template>

<style>
</style>

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

<style>
.modal-wrapper {
  border-radius: 6px;
  background-color: #fff;
  -webkit-box-shadow: 0 0 10px 0 rgba(0,0,0,.1);
  box-shadow: 0 0 10px 0 rgba(0,0,0,.1);
  border: 1px solid rgba(72,84,101,.2);
  width: 100%;
  margin: 0 auto 80px;
  position: relative;
}

#map {
  height: calc(100vh - 65px);

  border-radius: 6px;
  -webkit-box-shadow: 0 0 10px 0 rgba(0,0,0,.1);
  box-shadow: 0 0 10px 0 rgba(0,0,0,.1);
  z-index: 10;
  overflow: hidden;
}
.right-fixed-container {
  padding-left: 0px;
  top: 60px;
  position: sticky;
  height: calc(100vh - 116px);
}
</style>
