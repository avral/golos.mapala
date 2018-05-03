<template lang="pug">
  div.map
    gmap-map(
      :options="mapOptions",
      :center="center",
      :zoom="4",
      @idle="updateMarkersList",
      ref="mmm",
      map-type-id="terrain",

      @dragend="checkBounds"
      )

      gmap-marker(
        v-for="marker in markers",
        :key="marker.permlink + marker.author",
        :position="{ lat: Number(marker.position.latitude), lng: Number(marker.position.longitude) }",
        :clickable="true",
        :draggable="false",
        :icon="icon",
        @mouseover="openInfoWindow(marker)",
        @mouseout="infoWindow.opened = false",
        @click="$router.push({ path: $action('post-view', marker.author, marker.permlink) })"
        )

      gmap-info-window(
        :options="infoWindow.options",
        :opened="infoWindow.opened",
        :content="infoWindow.content",
        :position="infoWindow.position",
        @closeclick="infoWindow.opened=false"
        )

</template>

<script>
import { map_options } from '@/config'


export default {
  data() {
    return {
      center: {
        lat: 40.748817,
        lng: -73.985428
      },

      markers: [],

      options: map_options,
    }
  }
}

</script>

<style>
</style>

