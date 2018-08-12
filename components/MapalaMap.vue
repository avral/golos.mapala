<template lang="pug">
  gmap-map(
    :options="options",
    :center="center",
    :zoom="4",
    @idle="updateMarkers",
    ref="mmm",
    map-type-id="terrain")

    // :position="{lat: parseFloat(marker.location.geometry.coordinates[0]), lng:parseFloat(marker.location.geometry.coordinates[1]) }",
    gmap-marker(
      v-for="marker in markers",
      :key="marker.permlink",
      :position="{lat: parseFloat(marker.position.latitude), lng:parseFloat(marker.position.longitude) }",
      :clickable="true",
      :draggable="false",
      @click="open_modal(marker)"
      @mouseover="openInfoWindow(marker)",
      @mouseout="infoWindow.opened = false",
      icon="https://mapala.net/pointer.png"
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
import gql from 'graphql-tag'
import { mapActions, mapState } from 'vuex'
import PostModal from '~/components/post/PostModal.vue'


export default {
  data() {
    return {
      infoWindow: {
        options: {
          maxWidth: 250,
          pixelOffset: {
            width: 0,
            height: -35
          }
        },
        position: {
          lat: 0.0,
          lng: 0.0
        },
        opened: false,
        content: ''
      },
      center: {
        lat: 40.748817,
        lng: -73.985428
      },

      options: map_options,
    }
  },

  computed: {
    ...mapState({
      'markers': state => state.map.markers
    })
  },

  methods: {
    ...mapActions({
      'fetch_markers': 'map/fetch_markers'
    }),

    openInfoWindow (marker) {
      this.infoWindow.opened = true

      this.infoWindow.content = `<h6>${marker.title}</h6><p>${marker.body}</p>`

      this.infoWindow.options.maxWidth = 180

      this.infoWindow.position = {
        lat: Number(marker.position.latitude),
        lng: Number(marker.position.longitude)
      }
    },

    async open_modal(marker) {
      this.$modal.show(PostModal, {author: marker.author, permlink: marker.permlink}, {
        height: 'auto',
        width: '60%',
        scrollable: true,
        classes: ['v--modal', 'post-modal']
      })
    },

    async updateMarkers() {
      const map = this.$refs.mmm.$mapObject
      const bounds = map.getBounds()

      //const boundingBox = [[bounds.b.b, bounds.f.b], [bounds.b.f, bounds.f.f]]
      const boundingBox = [
        //bounds.getSouthWest().lng(),
        //bounds.getSouthWest().lat(),
        //bounds.getNorthEast().lng(),
        //bounds.getNorthEast().lat(),
        bounds.b.b,
        bounds.f.b,
        bounds.b.f,
        bounds.f.f,
      ].join()

      this.fetch_markers(boundingBox)
    }
  }
}

</script>
