<template lang="pug">
.row
  .col
    a(@click="open_modal") Тет модалки
    .post-item.mb-3(:class="post.thumb ? 'w_i': ''")
      nuxt-link(v-if="post.thumb" :to="{name: 'post', params: {author: post.author.name, permlink: post.permlink}}")
        .post-image
          img(:src="post.thumb | golos_proxy('490x320')", alt='')
      .short
        .top-block
          .img-wrap
            nuxt-link.card-link(:to="{name: 'account', params: {account: post.author.name}}")
              img.user_av(:src="post.author.meta.profile.profileImage | golos_proxy('120x120')")
          .name-block.mr-2
            nuxt-link.name(:to="{name: 'account', params: {account: post.author.name}}") @{{ post.author.name }}
            .date {{ post.created | formatDate }}
          // TODO Локация
          .location {{ post.meta.location.name }}

        nuxt-link(:to="{name: 'post', params: {author: post.author.name, permlink: post.permlink}}")
          h2.write-header  {{ post.title }}
          p.write-text {{ post.body | html_preview }}

      .row
        .col
          el-button.upvote-btn(size="small" v-if="!post.isVoted", @click="vote", :loading="loading").pull-right
            round.mr-2
            span.mutted-text.mr-2 Поддержать
            | | 
            span.text-light.ml-2 133

          el-button.upvote-btn(v-else, size="medium", disabled)
            round.mr-2
            span.mutted-text.ml-2 Поддержано
            span.text-light.ml-2 133

    //.d-flex.flex-row.no-gutters
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

    //.d-flex.flex-row.card-body.py-1
      //.p-3.mb-2.bg-light.text-dark Выплаты: {{  }}


      //loading-button.mr-3.btn.btn-outline-primary(v-if="!post.isVoted", @click="vote", :loading="loading")
        i.fa.fa-fw.fa-thumbs-up
        | Голосовать

      //button.mr-3.btn.btn-outline-success(v-else)
        i.fa.fa-fw.fa-thumbs-up
        | Проголосованно
      //el-button(type="primary", icon="el-icon-share", href="http://vk.com/share.php?url=", size="small") Поделиться
    //.card-body
      nuxt-link.card-link(:to="{name: 'account', params: {author: post.author}}") @{{ post.author }}

    //.d-flex.align-items-center.flex-row.card-footer.small.text-muted.py-1.px-2
      nuxt-link.card-link(:to="{name: 'account', params: {author: post.author}}").mr-1 @{{ post.author }}
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
      nuxt-link.card-link(:to="{name: 'account', params: {author: post.author}}") @{{ post.author }}

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
import Round from '~/components/elements/svg/round.vue'
import PostModal from '~/components/post/PostModal.vue'


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

    open_modal() {
      this.$modal.show(PostModal, {post: this.post}, {
        height: 'auto',
        width: '60%',
        scrollable: true,
        classes: ['v--modal', 'post-modal']
      })
    },

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
  },

  components: {
    Round,
    PostModal
  }
}
</script>

<style>

.post-item .name {
  font: 700 16px/20px PT Sans;
  letter-spacing: -.5px;
  color: #6d9ee1;
}

.write-text {
  margin: 0 12px 20px;
  font-size: 18px;
  letter-spacing: -.3px;
  color: #20262d;
}

.bottom-block {
  display: flex;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
}

.write-header {
  margin: 0 12px 13px;
  font: 700 26px PT Sans;
  letter-spacing: -.5px;
  color: #20262d;
}

.post-item .date {
  font-size: 12px;
  letter-spacing: -.5px;
  color: rgba(72,84,101,.7);
  line-height: 16px;
}

.img-wrap {
  border-radius: 50%;
  margin-right: 8px;
  width: 40px;
  height: 40px;
  overflow: hidden;
  background: #ddd;
  -ms-flex-negative: 0;
  flex-shrink: 0;
}
.top-block {
  display: flex;
  padding: 12px 12px 10px;
}

.short a {
  text-decoration: none;
}

.post-item {
  width: 100%;
  border-radius: 6px;
  background-color: #fff;
  -webkit-box-shadow: 0 0 10px 0 rgba(0,0,0,.1);
  box-shadow: 0 0 10px 0 rgba(0,0,0,.1);
  border: 1px solid rgba(72,84,101,.2);
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
}

.post-image {
  overflow: hidden;
  border-top-left-radius: 6px;
  border-top-right-radius: 6px;
}

.post-image img {
  display: block;
  width: 100%;
}

.short {
  border-radius: 6px;
  background: #fff;
  -webkit-box-shadow: 0 0 7px 0 rgba(0,0,0,.33);
  box-shadow: 0 0 7px 0 rgba(0,0,0,.33);
  position: relative;
  z-index: 1;
  padding-bottom: 10px;
}

.post-item.w_i .short{
  margin: -80px 12px 25px;
  border-radius: 6px;
  background: #ffffff;
  box-shadow: 0 0 7px 0 rgba(0, 0, 0, 0.33);
  position: relative;
  z-index: 1;
  padding-bottom: 10px;
}

.post-modal {
  top: 70px !important;
}
</style>
