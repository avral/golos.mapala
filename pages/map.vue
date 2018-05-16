<template lang="pug">
  mapala-map#map

</template>

<script>
import MapalaMap from '@/components/MapalaMap'

export default {
  components: {
    MapalaMap
  }
}

</script>

<style scoped>
#map {
  position: relative;
  width: 100%;
  height: calc(100vh - 61px);
}

#main-container {
  padding-right: 0px;
  padding-left: 0px;
  margin-right: 0;
  margin-left: 0;
}
</style>
