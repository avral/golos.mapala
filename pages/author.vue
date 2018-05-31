<template lang="pug">
.container.mt-2
  div(v-if="author.name")
    .card.hovercard
      .card-background
        img.card-bkimg(alt="", :src="author.json_metadata.profile.cover_image")
        // http://lorempixel.com/850/280/people/9/
      .useravatar
        img(alt='', :src="author.json_metadata.profile.profile_image")
      .card-info
        span.card-title {{ author.name }}

    b-tabs
      b-tab(title="Лента")
        feed

      b-tab(title="Карта") Постыпользователя на карте

      b-tab(title="Задания") Задания
      b-tab(title="История") История

  div(v-else)
    p.lead.text-center Такого аккаунта не существует :(
    

</template>

<script>
import Feed from '@/components/post/Feed'
import { mapState } from 'vuex'

export default {
  async asyncData ({ store, route, error }) {
    try {
      let wait = await store.dispatch('author/set_author', route.params.author)
    } catch (e) {
      error(e.message)
    }
  },

  components: {
    Feed
  },

  computed: {
    ...mapState({
      'author': state => state.author.author
    })
  }
}

</script>

<style>
.card.hovercard {
    position: relative;
    padding-top: 0;
    overflow: hidden;
    text-align: center;
    background-color: #fff;
    background-color: rgba(255, 255, 255, 1);
}
.card.hovercard .card-background {
    height: 130px;
}
.card-background img {
    min-width: 100%;
    background-position: 50% 50%;
}
.card.hovercard .useravatar {
    position: absolute;
    top: 15px;
    left: 0;
    right: 0;
}
.card.hovercard .useravatar img {
    width: 100px;
    height: 100px;
    max-width: 100px;
    max-height: 100px;
    -webkit-border-radius: 50%;
    -moz-border-radius: 50%;
    border-radius: 50%;
}
.card.hovercard .card-info .card-title {
    padding:0 5px;
    font-size: 20px;
    line-height: 1;
    color: #262626;
    border-radius: 4px;
}
</style>
