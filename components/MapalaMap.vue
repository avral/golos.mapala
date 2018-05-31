<template lang="pug">
  gmap-map(
    :options="options",
    :center="center",
    :zoom="4",
    @idle="updateMarkers",
    ref="mmm",
    map-type-id="terrain",

    @dragend="checkBounds"
    )

    gmap-marker(
      v-for="marker in markers",
      :key="marker.identifier",
      :position="{lat: parseFloat(marker.location.geometry.coordinates[0]), lng:parseFloat(marker.location.geometry.coordinates[1]) }",
      :clickable="true",
      :draggable="false",
      @click="$router.push({ path: $action('post-view', marker.author, marker.permlink) })"
      )

    //gmap-info-window(
      @mouseover="openInfoWindow(marker)",
      @mouseout="infoWindow.opened = false",
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
  },

  methods: {
    checkBounds() {
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
      ]
			console.log(boundingBox)

      let client = this.$apolloProvider.defaultClient

      let query = gql`
        query markers ($bbox: JSONString!, $author: String) {
          markers(bbox: $bbox, author: $author) {
            title,
            identifier,
            location
          }
        }
      `

      let {data: {markers}} = await client.query({query,
        variables: {
          bbox: JSON.stringify(boundingBox)
        }
      })

        
      this.markers = [...markers, ...this.markers].filter((elem, index, self) => self.findIndex(
          (t) => {return (t.identifier === elem.identifier)}) === index)
    }
  }
}

</script>
