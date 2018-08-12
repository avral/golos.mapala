<template lang="pug">
div
  create-post-button
  feed
</template>

<script>
import Feed from '@/components/post/Feed'
import CreatePostButton from '@/components/post/CreatePostButton'


export default {
  components: {
    Feed,
    CreatePostButton
  }
}

</script>

<style scoped>
#map {
  top: 78px;
  position: sticky;
  height: calc(100vh - 92px);

  border-radius: 6px;
  -webkit-box-shadow: 0 0 10px 0 rgba(0,0,0,.1);
  box-shadow: 0 0 10px 0 rgba(0,0,0,.1);
  z-index: 10;
  overflow: hidden;
}
.right-fixed-container {
  padding-left: 0px;
  top: 85px;
  position: sticky;
  height: calc(100vh - 116px);
}
</style>
