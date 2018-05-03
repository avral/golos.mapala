<template lang="pug">
  .card.mb-3
    nuxt-link(:to="{name: 'post', params: {author: post.author, permlink: post.permlink}}")
      //img.card-img-top.img-fluid.w-100(:src="post.firstImage", alt='')
      img.img-fluid(:src="post.firstImage", alt='')
    .card-body
      h5.card-title.mb-1
        nuxt-link(:to="{name: 'post', params: {author: post.author, permlink: post.permlink}}") {{ post.title }}
      p.card-text
        | {{ post.body.slice(0, 50) }}
        //a(href='#') #workinghardorhardlyworking
    hr.my-0
    .card-body.py-2.small
      a.mr-3.d-inline-block(href='#')
        i.fa.fa-fw.fa-thumbs-up
        | Like
      a.mr-3.d-inline-block(href='#')
        i.fa.fa-fw.fa-comment
        | Comment
      a.d-inline-block(href='#')
        i.fa.fa-fw.fa-share
        | Share
    .card-body
      nuxt-link.card-link(:to="{name: 'author_feed', params: {author: post.author}}") @{{ post.author }}

    hr.my-0
    .card-body.small.bg-faded
      .media
        img.d-flex.mr-3(src='http://placehold.it/45x45', alt='')
        .media-body
          h6.mt-0.mb-1
            a(href='#') Jessy Lucas
          | Where did you get that camera?! I want one!
          ul.list-inline.mb-0
            li.list-inline-item
              a(href='#') Like
            li.list-inline-item
              | ·
            li.list-inline-item
              a(href='#') Reply
    .card-footer.small.text-muted
      | Posted {{ post.created | formatDate }}
</template>

<script>
export default {
  props: ['post'],

  data() {
    return {
      //post: {},
      image: '',
    }
  },

  computed: {
    author: () => console.log(this.$router)
    //firstImage: () => {
    //  return 'https://assets.servedby-buysellads.com/p/manage/asset/id/38523'
    //}
    //firstImage: () => {
    //  console.log(this.post)
    //  if (this.post) {
    //    console.log(JSON.parse(this.post.json_metadata))
    //  }
    //  this.post ? JSON.parse(this.post.json_metadata).images[0] : ''
    //}
  }
}
</script>

<style>
.lol {
}

</style>
