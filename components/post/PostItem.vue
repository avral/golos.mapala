<template lang="pug">
  .card.mb-2
    .d-flex.flex-row.no-gutters
        .col-4(v-if="post.thumb")
          nuxt-link(:to="{name: 'post', params: {author: post.author, permlink: post.permlink}}")
            img.img-fluid(v-if="post.thumb", :src="post.thumb | golos_proxy('250x170')", alt='')
            // img.img-fluid(v-else, src="@/assets/img/mapala-logo.png", alt='')
        .card-body
          h5.card-title.mb-1
              nuxt-link(:to="{name: 'post', params: {author: post.author, permlink: post.permlink}}") {{ post.title }}

          p.card-text
            | {{ post.body | html_preview }}
            //a(href='#') #workinghardorhardlyworking

    .d-flex.flex-row.card-body.py-1
      //.p-3.mb-2.bg-light.text-dark Выплаты: {{  }}


      //loading-button.mr-3.btn.btn-outline-primary(v-if="!post.isVoted", @click="vote", :loading="loading")
        i.fa.fa-fw.fa-thumbs-up
        | Голосовать

      //button.mr-3.btn.btn-outline-success(v-else)
        i.fa.fa-fw.fa-thumbs-up
        | Проголосованно
      //el-button(type="primary", icon="el-icon-share", href="http://vk.com/share.php?url=", size="small") Поделиться
    //.card-body
      nuxt-link.card-link(:to="{name: 'author_feed', params: {author: post.author}}") @{{ post.author }}

    .d-flex.align-items-center.flex-row.card-footer.small.text-muted.py-1.px-2
      nuxt-link.card-link(:to="{name: 'author_feed', params: {author: post.author}}").mr-1 @{{ post.author }}
      | {{ post.created | formatDate }}


      .ml-auto(v-show="$store.getters['account/isAuth']")
        el-button(size="medium", v-if="!post.isVoted", @click="vote", :loading="loading")
          i.fa.fa-fw.fa-thumbs-up
          | Голосовать

        el-button(v-else, size="medium", disabled)
          i.fa.fa-fw.fa-thumbs-up
          | Проголосованно


    //.card-body.py-2
      //.p-3.mb-2.bg-light.text-dark Выплаты: {{  }}

      loading-button.mr-3.btn.btn-outline-primary(v-if="!post.isVoted", @click="vote", :loading="loading")
        i.fa.fa-fw.fa-thumbs-up
        | Голосовать

      button.mr-3.btn.btn-outline-success(v-else)
        i.fa.fa-fw.fa-thumbs-up
        | Проголосованно
      //el-button(type="primary", icon="el-icon-share", href="http://vk.com/share.php?url=", size="small") Поделиться
    //.card-body
      nuxt-link.card-link(:to="{name: 'author_feed', params: {author: post.author}}") @{{ post.author }}

    //hr.my-0
    //.card-body.small.bg-faded
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
</template>

<script>
import { mapState, mapActions } from 'vuex'


export default {
  props: ['post'],

	data() {
		return {
			loading: false
		}
	},

  methods: {
    ...mapActions({
      gols_vote: 'golos/vote'
    }),

    async vote() {
			this.loading = true

			try {
				await this.gols_vote(this.post)
      	this.post.isVoted = true
      	this.$notify({title: 'Voted', type: 'success'})
			} catch (e) {
      	this.$notify({title: 'Vote error', message: e.message, type: 'error'})
			} finally {
				this.loading = false
			}
    }
  }
}
</script>

<style>
.lol {
}

</style>
